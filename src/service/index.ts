import { merge } from 'rxjs'
import { EventSource } from 'command-bus'
/* project */
import { createRepsitoryGroup } from './shared'
import { createDatabase, createInfraApi } from '@/infra'
import { bootAppSessionService } from './app-session'
import { bootPomodoroTimerAppService } from './pomodoro-timer'
import { bootTodoService } from './todo'
import { bootTodoListService } from './todolist'
export * from './shared'

export const service = (ev: EventSource) => {
  /* root api */
  const infraApi = createInfraApi(createDatabase())
  const repo = createRepsitoryGroup()

  return merge(
    bootAppSessionService(ev, repo),
    bootPomodoroTimerAppService(ev, repo),
    bootTodoService(ev, repo, infraApi),
    bootTodoListService(ev, repo),
  )
}


export default service
