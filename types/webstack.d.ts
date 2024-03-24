declare namespace WebStack {
  interface Data {
    taxonomy: string
    icon: string
    links?: Link[]
    list?: {
      term: string
      links: Link[]
    }[]
  }
  interface Link {
    title: string
    url: string
    logo: string
    description: string
  }
}
