import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { JobDataModel } from '../models/data-layer/job-data.model';
import { JobModel } from '../models/presentation-layer/job.model';
import { JobStatusEnum } from '../models/data-layer/job-status.enum';
import { map, mapTo, tap } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly jobsSource$ = new BehaviorSubject<JobDataModel[]>([]);

  constructor(private usersService: UsersService) {
    this.jobsSource$.next(
      [
        {
          id: '1',
          name: 'Download a movie file',
          status: JobStatusEnum.DONE,
        },
        {
          id: '2',
          name: 'Validate a video',
          status: JobStatusEnum.IN_PROGRESS,
          assignedUserId: '2',
        },
        {
          id: '3',
          name: 'Apply watermark on a video',
          status: JobStatusEnum.IN_PROGRESS,
          assignedUserId: '1',
        },
        {
          id: '4',
          name: 'Send video to a translator',
          status: JobStatusEnum.NEW,
          assignedUserId: '1',
        },
        {
          id: '5',
          name: 'Correct the translations',
          status: JobStatusEnum.NEW,
        },
        {
          id: '6',
          name: 'Bake translations onto a video',
          status: JobStatusEnum.NEW,
          assignedUserId: '2',
        },
        {
          id: '7',
          name: 'Send a video file to a theater',
          status: JobStatusEnum.NEW,
        },
      ],
    );
  }

  readList$(): Observable<JobModel[]> {
    return this.jobsSource$
      .pipe(
        map(jobs => jobs.map(job => ({
          id: job.id,
          name: job.name,
          status: job.status,
          assignedUser: job.assignedUserId ? this.usersService.read(job.assignedUserId) : undefined,
        }))),
      );
  }

  setUser(jobId: string, userId?: string): Observable<void> {
    return this.findJob(jobId)
      .pipe(
        tap(job => {
          job.assignedUserId = userId;
          this.reloadData();
``        }),
        mapTo(undefined),
      );
  }

  setStatus(jobId: string, status: JobStatusEnum): Observable<void> {
    return this.findJob(jobId)
      .pipe(
        tap(job => {
          job.status = status;
          this.reloadData();
        }),
        mapTo(undefined),
      );
  }

  reloadData(): void {
    this.jobsSource$.next([...this.jobsSource$.value]);
  }

  private findJob(jobId: string): Observable<JobDataModel> {
    const foundJob = this.jobsSource$.value.find(job => job.id === jobId);
    if (!foundJob) {
      return throwError('Job not found');
    }
    return of(foundJob);
  }

}
