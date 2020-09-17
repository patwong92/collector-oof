import React from 'react';

type Place = 'home' | 'work' | { custom: string }

type TodoList = Readonly<{
  id: number
  text: string
  place?: Place
  done: boolean
}>

type CompletedTodoList = TodoList & {
  readonly done: true
}

const toggleTodo3 = (todos: readonly TodoList[]): CompletedTodoList[] => {
  return todos.map(todo => ({
    ...todo,
    done: true
  }))
}

const options = [
  {id: 1, text: 'First todo', done: false, place: 'home' as const},
  {id: 2, text: 'Second todo', done: false, place: { custom: 'hehexp' as const}}
];

console.log(toggleTodo3(options))

export const Todo: React.FC<{}> = () => {
  return (
    <div>
      ${options.map(e => {
        return (
          <form>
            <input id={e.id.toString()} type="checkbox" checked={e.done}/>
            <label>{e.text}</label>
          </form>
        )
      })}
    </div>
  )
}