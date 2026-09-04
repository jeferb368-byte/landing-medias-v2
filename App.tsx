import { useState } from 'react'
import { Benefits } from './components/Benefits/Benefits'
import { Comparativa } from './components/Comparativa/Comparativa'
import { Faq } from './components/Faq/Faq'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { OrderForm } from './components/OrderForm/OrderForm'
import { Packs } from './components/Packs/Packs'
import { Problema } from './components/Problema/Problema'
import { QueIncluye } from './components/QueIncluye/QueIncluye'
import { Resenas } from './components/Resenas/Resenas'
import { Ritual } from './components/Ritual/Ritual'
import { StickyBar } from './components/StickyBar/StickyBar'
import { TopBar } from './components/TopBar/TopBar'
import { TrustStrip } from './components/TrustStrip/TrustStrip'
import { packs, type Pack } from './config/site'
import { useReveal } from './hooks/useReveal'
import { irA } from './lib/scroll'

export default function App() {
  /**
   * Arranca en el pack marcado como destacado (el de 4 pares), no en el más
   * barato. Con el pack pequeño por defecto casi nadie subía: el formulario
   * queda justo debajo de los precios, así que la clienta no elegía nada,
   * aceptaba lo que ya venía puesto.
   *
   * PARA REVERTIRLO: cambia `p.destacado` por el pack que quieras de arranque.
   * Es una sola línea y es lo primero que hay que tocar si la conversión baja.
   */
  const [seleccionado, setSeleccionado] = useState<Pack>(
    packs.find((p) => p.destacado) ?? packs[0]
  )
  useReveal()

  const elegirPack = (pack: Pack) => {
    setSeleccionado(pack)
    irA('pedido')
  }

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problema />
        <Benefits />
        <Ritual />
        <Comparativa />
        <Resenas />
        <QueIncluye />
        <Packs seleccionado={seleccionado} onSeleccionar={elegirPack} />
        <OrderForm seleccionado={seleccionado} onSeleccionar={setSeleccionado} />
        <Faq />
      </main>
      <Footer />
      <StickyBar seleccionado={seleccionado} />
    </>
  )
}
