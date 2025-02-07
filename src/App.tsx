import "./App.css";
import { ProjectExplorer } from "./components/ProjectExplorer/_index";
import { TreeProvider } from "./context/TreeProvider";

function App() {
  return (
    <TreeProvider>
      <div className='min-h-screen bg-gray-50 p-8'>
        <ProjectExplorer />
      </div>
    </TreeProvider>
  );
}

export default App;
