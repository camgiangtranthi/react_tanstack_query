import {useState} from "react";
import {useProjects} from "../service/queries.ts";

export const Projects = () => {
	const [page, setPage] = useState(1);
	
	const {data, isPending, error, isError, isPlaceholderData, isFetching} =
		useProjects(page);
	
	return (
		<div>
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				<div>
					{data.map((project) => (
						<p key={project.id}>{project.name}</p>
					))}
				</div>
			)}
			<span>Current page: {page}</span>
			<button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
				Previous page
			</button>
			{""}
			<button
				onClick={() => {
					if (!isPlaceholderData) {
						setPage((old) => old + 1)
					}
				}}
				disabled={isPlaceholderData}
			>
				Next page
			</button>
			{isFetching ? <span>Loading...</span> : null}{""}
		</div>
	)
}
