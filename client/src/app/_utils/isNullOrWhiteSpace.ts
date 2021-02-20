import { isNullOrUndefined } from './isNullOrUndefined';

export function isNullOrWhiteSpace(str: any): boolean {
    if (typeof str !== 'string') {
        return isNullOrUndefined(str);
    }
    return isNullOrUndefined(str) || str.match(/^ *$/) !== null;
}
