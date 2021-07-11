// tslint:disable: no-bitwise
import { isNullOrUndefined } from './isNullOrUndefined';

export class Guid {
  static get empty(): '00000000-0000-0000-0000-000000000000' {
    return '00000000-0000-0000-0000-000000000000';
  }

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  static create(): string {
    const crypto = window.crypto || (window as any).msCrypto; // msCrypto for IE11

    if (isNullOrUndefined(crypto)) {
      // crypto is not available on this platform we use random which provide a good enough option to
      // generate uuid
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        (c: string) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    }
    // Using crypto is the best option to generate uuid
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
