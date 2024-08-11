// \@ts-ignore

import PocketBase from 'pocketbase'
import type { Handle, MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const handle: Handle = async({event, resolve}) => {
  event.locals.pb = new PocketBase('http://127.0.0.1:8090')
  event.locals.pb.authStore.leadFromCookie(event.request.headers.get('cookie') || '')

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
  }
}