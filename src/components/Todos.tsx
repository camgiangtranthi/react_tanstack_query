import {useTodos, useTodosIds} from "../service/queries.ts";
import {useCreateTodo, useDeleteTodo, useUpdateTodo} from "../service/mutations.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {Todo} from "../types/todo.ts";


export const Todos = () => {
	const todosIdsQuery = useTodosIds();
	const todosQueries = useTodos(todosIdsQuery.data)
	
	const createTodoMutation = useCreateTodo();
	const updateTodoMutation = useUpdateTodo();
	const deleteTodoMuTation = useDeleteTodo();
	
	const {register, handleSubmit} = useForm<Todo>()
	
	const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
		createTodoMutation.mutate(data)
	}
	
	const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
		if (data) {
			updateTodoMutation.mutate({...data, checked: true});
		}
	}
	
	const handleDeleteTodo = async (id: number) => {
		await deleteTodoMuTation.mutateAsync(id);
	}
	
	return (
		<>
			<form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
				<h4>New todo:</h4>
				<input placeholder="Title" {...register("title")}/>
				<br/>
				<input placeholder="Description" {...register("description")}/>
				<br/>
				<input
					type="submit"
					disabled={createTodoMutation.isPending}
					value={createTodoMutation.isPending ? "Creating" : "Create todo"}
				/>
			</form>
			<ul>
				{todosQueries.map(({data}) => (
					<li key={data?.id}>
						<div>Id: {data?.id}</div>
						<span>
							<strong>Title: </strong>{data?.title}
							<br/>
							<strong>Description: </strong>{data?.description}
						</span>
						<div>
							<button
								onClick={() => handleMarkAsDoneSubmit(data)}
							    disabled={data?.checked}
							>
								{data?.checked ? "Done" : "Mark as done"}
							</button>
							{data && data?.id && (
								<button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>
							)}
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
