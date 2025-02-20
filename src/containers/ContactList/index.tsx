import { useSelector } from 'react-redux'
import Contact from '../../components/Contact'
import { MainContainer, Title } from '../../styles'
import { NotFoundMessage } from './styles'
import { RootReducer } from '../../store'

const ContactList = () => {
  const { items } = useSelector((state: RootReducer) => state.contact)
  const { term, favorites } = useSelector((state: RootReducer) => state.filter)

  const filterContact = () => {
    let filteredContacts = items

    if (term !== undefined) {
      filteredContacts = filteredContacts.filter(
        (item) => item.name.toLowerCase().search(term.toLowerCase()) >= 0
      )

      if (favorites) {
        filteredContacts = filteredContacts.filter(
          (item) => item.favorite === favorites
        )
      }

      return filteredContacts
    } else {
      return items
    }
  }

  const contacts = filterContact()

  return (
    <MainContainer>
      <Title>
        {favorites
          ? 'Mostrando os contatos favoritados'
          : 'Mostrando todos os contatos'}
      </Title>
      <ul>
        {contacts.length <= 0 && (
          <>
            <NotFoundMessage>
              <span>
                <i className="fa-solid fa-user-large-slash"></i>
              </span>
              <p>Nenhum contato encontrado!</p>
            </NotFoundMessage>
          </>
        )}
        {contacts.map((item) => (
          <li key={item.name}>
            <Contact
              id={item.id}
              name={item.name}
              email={item.email}
              phone={item.phone}
              favorite={item.favorite}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ContactList
