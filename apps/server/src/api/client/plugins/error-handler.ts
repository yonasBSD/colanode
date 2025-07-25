import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

import { ApiErrorCode } from '@colanode/core';
import { createLogger } from '@colanode/server/lib/logger';

const logger = createLogger('api:client:error-handler');

export const errorHandlerCallback: FastifyPluginCallback = (
  fastify,
  _,
  done
) => {
  fastify.setErrorHandler(async (error, _, reply) => {
    logger.error(
      error,
      `Error processing request ${error.statusCode} - ${error.code} - ${error.message}`
    );

    // TODO: return detailed validation errors
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        code: ApiErrorCode.ValidationError,
        message:
          'One or more fields are invalid. Please check your request and try again.',
      });
    }

    return reply.code(500).send({
      code: ApiErrorCode.Unknown,
      message: 'An unexpected error occurred. Please try again later.',
    });
  });

  done();
};

export const errorHandler = fp(errorHandlerCallback);
