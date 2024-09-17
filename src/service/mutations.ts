import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "../types/todo.ts";
import {createTodo, deleteTodo, updateTodo} from "./api.ts";

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: (data: Todo) => createTodo(data),
		
		onSettled: async (_, error) => {
			if (error) {
				console.log(error)
			} else {
				await queryClient.invalidateQueries({queryKey: ["todos"]})
			}
		}
	})
}

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: (data: Todo) => updateTodo(data),
		
		onSettled: async (_, error, variables) => {
			if (error) {
				console.log(error);
			} else {
				await queryClient.invalidateQueries({queryKey: ["todos"]});
				await queryClient.invalidateQueries({queryKey: ["todo", {id: variables.id}]})
			}
		}
	})
}

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: (id: number) => deleteTodo(id),
		
		onSettled: async (_, error) => {
			if(error) {
				console.log(error);
			} else {
				await queryClient.invalidateQueries({queryKey: ["todos"]})
			}
		}
	})
}
