export type Todo = { id: string; title: string };
const todos = [
  { id: "123", title: "do japa" },
  { id: "456", title: "do asanas" },
];

export function getTodos() {
  return new Promise<Todo[]>((res) => setTimeout(() => res(todos), 1000));
}

export function postTodo(newTodo: { id: string; title: string }) {
  return new Promise((res) =>
    setTimeout(() => {
      todos.push({
        id: Math.random().toString(36).slice(2),
        title: newTodo.title,
      });
      return res(todos);
    }, 1000)
  );
}
