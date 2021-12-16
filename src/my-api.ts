export type Todo = { id: string; title: string };
const todos = [
  { id: "123", title: "do japa" },
  { id: "456", title: "do asanas" },
];

export type Project = { id: number; name: string };
export type Projects = { projects: Project[]; hasMore: boolean };
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

export function getProjects(page: number) {
  console.log("get page", page);
  return new Promise<Projects>((res) => {
    const projects = new Array(10).fill(null).map((_, i) => ({
      id: page * 10 + i,
      name: `Project ${page * 10 + i}`,
    }));
    setTimeout(() => {
      return res({
        projects,
        hasMore: true,
      });
    }, 2000);
  });
}
