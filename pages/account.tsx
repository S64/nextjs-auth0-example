import { NextPageContext } from "next";
import { AuthenticationProps, useUser, withAuthentication } from "../user";

type Props = NextPageContext & AuthenticationProps

function Account({ user }: Props) {
  return <>
    <div>
      <span>{`${user?.name} (${user?.nickname})`}</span>
      <img src={user?.picture}/>
    </div>
    <div>If you want to delete account, Please contact us. (TODO: Impl account deletion)</div>
    <a href="/api/auth0/signout">Signout</a>
  </>
}

export default withAuthentication(Account)
