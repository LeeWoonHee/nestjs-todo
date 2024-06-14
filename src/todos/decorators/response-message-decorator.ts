// import { SetMetadata } from '@nestjs/common';

// export const ResponseMsg = (message: string) => {
//   SetMetadata('response-message', message);
// };
import { Reflector } from '@nestjs/core';

export const ResponseMsg = Reflector.createDecorator<string>();
