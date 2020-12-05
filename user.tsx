import { IClaims } from '@auth0/nextjs-auth0/dist/session/session'
import React, { Component } from 'react'
import auth0 from './auth0'

type UserProfile = IClaims & {
  nickname?: string,
  name?: string,
  picture?: string,
  updated_at?: string,
  email?: string,
  email_verified?: boolean,
  sub?: string,
}

type UserContextValue = {
  user: UserProfile | null,
}

const UserContext = React.createContext<UserContextValue>({ user: null, })
export const useUser = (): UserContextValue => React.useContext(UserContext)

const fetchUser = async (): Promise<UserProfile | null> => {
  const res = await fetch('/api/auth0/me')
  return res.ok ? await res.json() : null
}

export const UserProvider = (
  {
    userContext = useUser(),
    children,
  }: {
    userContext?: UserContextValue,
    children: React.ReactNode,
  }
) => {
  const [fetchedUser, setFetchedUser] = React.useState<UserProfile | null>(userContext.user)

  React.useEffect(() => {
    if (fetchedUser) {
      return
    } else if (userContext.user) {
      setFetchedUser(userContext.user)
      return
    }

    (async () => {
      setFetchedUser(await fetchUser())
    })()
  }, [fetchedUser])

  return <UserContext.Provider
    value={{...userContext, user: fetchedUser}}>{children}</UserContext.Provider>
}

export type AuthenticationProps = {
  user: UserProfile | null,
}

export function withAuthentication(InnerComponent: React.ElementType | React.FunctionComponent): React.ComponentType {
  return class withAuthentication extends Component<AuthenticationProps> {
    
    static async getInitialProps(context): Promise<AuthenticationProps> {
      if (!context.req) {
        return {
          user: await fetchUser(),
        };
      } else {
        const session = await auth0.getSession(context.req);
        return {
          user: session && session.user ? session.user : null,
        }
      }
    }

    constructor(props) {
      super(props);
    }

    render() {
      if (!this.props.user) {
        return <div {...this.props}>Signin required.</div>
      } else {
        return <InnerComponent {...this.props}/>
      }
    }

  }
}
