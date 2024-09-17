import {Todos} from "./components/Todos.tsx";
import {Projects} from './components/Projects.tsx'
import {Product} from './components/Products.tsx'

function App() {
	return (
		<>
			<Product />
			<Projects/>
			<Todos/>
		</>
	)
}

export default App
