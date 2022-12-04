import { Injectable } from '@angular/core';
import { BreadcrumbItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  breadcrumbs: BreadcrumbItem[] = [];
}
