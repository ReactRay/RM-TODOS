import { todoService } from '../../services/todo.service.js'
import { userService } from '../../services/user.service.js'
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  SET_IS_LOADING,
  UPDATE_TODO,
} from '../reducers/todo.reducer.js'
import { SET_USER_SCORE } from '../reducers/user.reducer.js'
import { store } from '../store.js'
import { getScore, incrementScore } from './user.actions.js'

export function loadTodos() {
  // filter as param
  const filterBy = store.getState().todoModule.filterBy

  store.dispatch({ type: SET_IS_LOADING, isLoading: false }) // change later
  return todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({ type: SET_TODOS, todos })
    })
    .catch((err) => {
      console.log('todo action -> Cannot load todos', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeTodo(todoId) {
  // change later
  return todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: REMOVE_TODO, todoId })
    })
    .catch((err) => {
      console.log('todo action -> Cannot remove todo', err)
      throw err
    })
    .finally(() => userService.addToHistory('removed a todo'))
}

export function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO
  return todoService
    .save(todo)
    .then((savedTodo) => {
      store.dispatch({ type, todo: savedTodo })
      return savedTodo
    })
    .catch((err) => {
      console.log('todo action -> Cannot save todo', err)
      throw err
    })
    .finally(() => userService.addToHistory('saved a todo ->' + todo.txt))
}

export function toggleIsDone(todo) {
  const todoToSave = { ...todo, isDone: !todo.isDone }

  return todoService
    .save(todoToSave)
    .then((savedTodo) => {
      store.dispatch({ type: UPDATE_TODO, todo: savedTodo })

      if (savedTodo.isDone) {
        return incrementScore()
          .then((updatedScore) => {
            console.log('Updated user score:', updatedScore)
            return savedTodo
          })
          .catch((err) => {
            console.error('Failed to increment user score:', err)
            return savedTodo
          })
      }

      return savedTodo
    })
    .catch((err) => {
      console.error('Could not update the todo status:', err)
      throw err
    })
    .finally(() => {
      userService.addToHistory('toggled a todo ->' + todo.txt)
    })
}
