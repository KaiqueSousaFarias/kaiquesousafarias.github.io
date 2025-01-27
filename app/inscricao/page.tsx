"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { format, parse } from "date-fns"

export default function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    categoriaPeso: "",
    categoriaPesoNoGi: "",
    faixa: "",
    equipe: "",
    telefone: "",
    email: "",
    campeonatoGi: false,
    campeonatoNoGi: false,
    lutaCasada: false,
    festivalKids: false,
  })

  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyPix = () => {
    navigator.clipboard.writeText(
      "00020126360014BR.GOV.BCB.PIX0114+55219887088755204000053039865802BR5901N6001C62070503***63041D18",
    )
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === "dataNascimento") {
      const formattedDate = formatDateForDisplay(value)
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedDate,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submissionData = {
      ...formData,
      dataNascimento: formatDateForSubmit(formData.dataNascimento),
    }
    const message = `Novo registro para a 5ª Copa Magé de Jiu-Jitsu:
      Nome: ${submissionData.nome}
      Data de Nascimento: ${submissionData.dataNascimento}
      Categoria de Peso Gi: ${submissionData.categoriaPeso}
      Categoria de Peso No-Gi: ${submissionData.categoriaPesoNoGi}
      Faixa: ${submissionData.faixa}
      Equipe: ${submissionData.equipe}
      Telefone: ${submissionData.telefone}
      Email: ${submissionData.email}
      Campeonato Gi: ${submissionData.campeonatoGi ? "Sim" : "Não"}
      Campeonato No Gi: ${submissionData.campeonatoNoGi ? "Sim" : "Não"}
      Luta Casada: ${submissionData.lutaCasada ? "Sim" : "Não"}
      Festival Kids: ${submissionData.festivalKids ? "Sim" : "Não"}`

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5521988708875&text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    router.push("/confirmacao")
  }

  const formatDateForDisplay = (date: string) => {
    if (!date) return ""
    const parsedDate = parse(date, "yyyy-MM-dd", new Date())
    return format(parsedDate, "dd/MM/yyyy")
  }

  const formatDateForSubmit = (date: string) => {
    if (!date) return ""
    const [day, month, year] = date.split("/")
    return `${year}-${month}-${day}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-800 to-red-900 p-4 sm:p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Formulário de Inscrição
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nome" className="text-lg mb-2 block">
              Nome Completo
            </Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full"
              aria-required="true"
            />
          </div>
          <div>
            <Label htmlFor="dataNascimento" className="text-lg mb-2 block">
              Data de Nascimento
            </Label>
            <Input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
              className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full"
              aria-required="true"
              placeholder="DD/MM/AAAA"
              pattern="\d{2}/\d{2}/\d{4}"
            />
          </div>
          <div>
            <Label htmlFor="categoriaPeso" className="text-lg mb-2 block">
              Categoria Gi
            </Label>
            <Select name="categoriaPeso" onValueChange={(value) => handleSelectChange("categoriaPeso", value)} required>
              <SelectTrigger className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full">
                <SelectValue placeholder="Selecione sua categoria Gi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NÃO PARTICIPAREI">NÃO PARTICIPAREI</SelectItem>
                <SelectItem value="GALO">GALO</SelectItem>
                <SelectItem value="PLUMA">PLUMA</SelectItem>
                <SelectItem value="PENA">PENA</SelectItem>
                <SelectItem value="LEVE">LEVE</SelectItem>
                <SelectItem value="MÉDIO">MÉDIO</SelectItem>
                <SelectItem value="MEIO-PESADO">MEIO-PESADO</SelectItem>
                <SelectItem value="PESADO">PESADO</SelectItem>
                <SelectItem value="SUPER-PESADO">SUPER-PESADO</SelectItem>
                <SelectItem value="PESADÍSSIMO">PESADÍSSIMO</SelectItem>
                <SelectItem value="ABSOLUTO">ABSOLUTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="categoriaPesoNoGi" className="text-lg mb-2 block">
              Categoria No-Gi
            </Label>
            <Select
              name="categoriaPesoNoGi"
              onValueChange={(value) => handleSelectChange("categoriaPesoNoGi", value)}
              required
            >
              <SelectTrigger className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full">
                <SelectValue placeholder="Selecione sua categoria No-Gi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NÃO PARTICIPAREI">NÃO PARTICIPAREI</SelectItem>
                <SelectItem value="GALO">GALO</SelectItem>
                <SelectItem value="PLUMA">PLUMA</SelectItem>
                <SelectItem value="PENA">PENA</SelectItem>
                <SelectItem value="LEVE">LEVE</SelectItem>
                <SelectItem value="MÉDIO">MÉDIO</SelectItem>
                <SelectItem value="MEIO-PESADO">MEIO-PESADO</SelectItem>
                <SelectItem value="PESADO">PESADO</SelectItem>
                <SelectItem value="SUPER-PESADO">SUPER-PESADO</SelectItem>
                <SelectItem value="PESADÍSSIMO">PESADÍSSIMO</SelectItem>
                <SelectItem value="ABSOLUTO">ABSOLUTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="faixa" className="text-lg mb-2 block">
              Faixa
            </Label>
            <Select name="faixa" onValueChange={(value) => handleSelectChange("faixa", value)} required>
              <SelectTrigger className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full">
                <SelectValue placeholder="Selecione sua faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRANCA">BRANCA</SelectItem>
                <SelectItem value="CINZA">CINZA</SelectItem>
                <SelectItem value="AMARELA">AMARELA</SelectItem>
                <SelectItem value="LARANJA">LARANJA</SelectItem>
                <SelectItem value="VERDE">VERDE</SelectItem>
                <SelectItem value="AZUL">AZUL</SelectItem>
                <SelectItem value="ROXA">ROXA</SelectItem>
                <SelectItem value="MARROM">MARROM</SelectItem>
                <SelectItem value="PRETA">PRETA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="equipe" className="text-lg mb-2 block">
              Equipe
            </Label>
            <Input
              id="equipe"
              name="equipe"
              value={formData.equipe}
              onChange={handleChange}
              required
              className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full"
              aria-required="true"
            />
          </div>
          <div>
            <Label htmlFor="telefone" className="text-lg mb-2 block">
              Telefone
            </Label>
            <Input
              id="telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              required
              className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full"
              aria-required="true"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-lg mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-black bg-opacity-50 text-white border-red-500 focus:border-red-300 rounded-xl p-3 w-full"
              aria-required="true"
            />
          </div>
          <div>
            <Label className="text-xl font-semibold mb-4 block">Informações sobre a disputa</Label>
            <div className="space-y-4 mt-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="campeonatoGi"
                  name="campeonatoGi"
                  checked={formData.campeonatoGi}
                  onCheckedChange={(checked) =>
                    handleChange({ target: { name: "campeonatoGi", type: "checkbox", checked } })
                  }
                  className="border-red-500 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="campeonatoGi"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Participação no Campeonato Gi
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="campeonatoNoGi"
                  name="campeonatoNoGi"
                  checked={formData.campeonatoNoGi}
                  onCheckedChange={(checked) =>
                    handleChange({ target: { name: "campeonatoNoGi", type: "checkbox", checked } })
                  }
                  className="border-red-500 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="campeonatoNoGi"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Participação no Campeonato No Gi
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="lutaCasada"
                  name="lutaCasada"
                  checked={formData.lutaCasada}
                  onCheckedChange={(checked) =>
                    handleChange({ target: { name: "lutaCasada", type: "checkbox", checked } })
                  }
                  className="border-red-500 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="lutaCasada"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Participação em Luta Casada
                </label>
                <p className="text-sm text-red-300 mt-1 ml-9">
                  Observação: Se for luta casada, envie uma foto com o kimono.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="festivalKids"
                  name="festivalKids"
                  checked={formData.festivalKids}
                  onCheckedChange={(checked) =>
                    handleChange({ target: { name: "festivalKids", type: "checkbox", checked } })
                  }
                  className="border-red-500 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="festivalKids"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Participação no Festival Kids
                </label>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Label className="text-xl font-semibold mb-4 block">QR Code para Pagamento (PIX)</Label>
            <div className="bg-white p-6 rounded-xl flex flex-col items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qrcode-pix-lsOSBji4XO7Naw27oue0XJkgG1lXce.png"
                alt="QR Code PIX"
                width={200}
                height={200}
              />
              <p className="text-lg text-center mt-4 text-black">Chave PIX: (21) 98870-8875</p>
              <Button onClick={handleCopyPix} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                {copySuccess ? "Copiado!" : "Copiar PIX"}
              </Button>
              <p className="text-sm text-black font-bold mt-4 text-center">
                Observação: Após efetuar o pagamento, envie o comprovante do PIX para finalizar sua inscrição.
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Confirmar Inscrição
          </Button>
        </form>
        <div className="mt-8 text-center">
          <Link href="/" className="text-red-300 hover:text-red-100 text-lg transition-colors duration-300">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
