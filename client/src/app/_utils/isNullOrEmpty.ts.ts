import { isNullOrWhiteSpace } from './isNullOrWhiteSpace';

export function isNullOrEmpty(item: any): boolean {
    if (isNullOrWhiteSpace(item)) {
        return true;
    }
    if (Array.isArray(item)) {
        return item.length === 0;
    }
    return Object.keys(item).length === 0 && item.constructor === Object;
}
