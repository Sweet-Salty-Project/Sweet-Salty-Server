import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  userEmail: string;
  userId: string;
}

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
