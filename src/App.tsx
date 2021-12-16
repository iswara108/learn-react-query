import React from "react";
import "./App.css";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { getProjects, getTodos, postTodo } from "./my-api";
import { ReactQueryDevtools } from "react-query/devtools";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Todos() {
  const [page, setPage] = React.useState(0);

  const fetchProjects = (page = 0) => getProjects(page);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["projects", page], () => fetchProjects(page), {
      keepPreviousData: true,
    });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError && error instanceof Error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data?.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPreviousData && data?.hasMore) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>{" "}
      <span>{isPreviousData.toString()}</span>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </div>
  );
}

export default App;
