import {keepPreviousData, useInfiniteQuery, useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProduct, getProducts, getProjects, getTodo, getTodosIds} from "./api.ts";
import {Product} from "../types/Product.ts";

export const useTodosIds = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: getTodosIds,
	})
}

export const useTodos = (ids: (number | undefined)[] | undefined) => {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["todo", {id}],
				queryFn: () => getTodo(id!),
			}
		})
	})
}

export const useProjects = (page: number) => {
	return useQuery({
		queryKey: ['projects', {page}],
		queryFn: () => getProjects(page),
		placeholderData: keepPreviousData
	})
}

export const useProducts = () => {
	return useInfiniteQuery({
		queryKey: ["products"],
		queryFn: getProducts,
		initialPageParam: 0,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		getPreviousPageParam: (_, __, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined;
			}
			return firstPageParam - 1;
		}
	})
}

export const useProduct = (id: number | null) => {
	const queryClient = useQueryClient();
	
	return useQuery({
		queryKey: ["product", {id}],
		queryFn: () => getProduct(id!),
		enabled: !!id,
		placeholderData: () => {
			const cathedProducts = (
				queryClient.getQueryData(["products"]) as {
					pages: Product[] | undefined;
				}
			)?.pages?.flat(2);
			
			if (cathedProducts) {
				return cathedProducts.find((item) => item.id === id);
			}
		}
	})
}
