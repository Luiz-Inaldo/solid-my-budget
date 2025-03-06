import { Show } from "solid-js";
import GeneralChart from "../components/Charts/GeneralChart"
import { GlobalContextProvider, useGlobalContext } from "../context/GlobalContext"

const GraphicPage = () => {

  const { list } = useGlobalContext();

  return (
    <div
      style={{
        'max-width': '430px',
        'min-height': '100dvh',
        'margin': '0 auto'
      }}
    >
      <Show when={list() !== null} fallback={<h1>Carregando...</h1>}>
        <GeneralChart list={list} />
      </Show>
    </div>
  )
}

const Graphics = () => {

  return (
    <GlobalContextProvider>
      <GraphicPage />
    </GlobalContextProvider>
  )
}

export default Graphics