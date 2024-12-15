import { todoService } from '../../services/todo.service.js'
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  SET_IS_LOADING,
  UPDATE_TODO,
} from '../reducers/todo.reducer.js'
import { store } from '../store.js'

export function loadTodos() {
  // filter as param
  const filterBy = store.getState().todoModule.filterBy

  store.dispatch({ type: SET_IS_LOADING, isLoading: false }) // change later
  return todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({ type: SET_TODOS, todos })
      console.log(todos)
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
  return todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: REMOVE_TODO, todoId })
    })
    .catch((err) => {
      console.log('todo action -> Cannot remove todo', err)
      throw err
    })
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
}

export function toggleIsDone(todo) {
  const todoToSave = { ...todo, isDone: !todo.isDone }
  return todoService
    .save(todoToSave)
    .then((savedTodo) => {
      store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
      return savedTodo
    })
    .catch((err) => {
      console.log('could not update the todo status')
    })
}
