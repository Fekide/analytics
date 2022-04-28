defmodule PlausibleWeb.AuthPlug do
  import Plug.Conn
  use Plausible.Repo

  def init(options) do
    options
  end

  def call(conn, _opts) do
    case get_session(conn, :current_user_id) do
      nil ->
        conn

      id ->
        user =
          Repo.get_by(Plausible.Auth.User, id: id)
          |> Repo.preload(
            subscription:
              from(s in Plausible.Billing.Subscription, order_by: [desc: s.inserted_at])
          )

        is_super_admin = Plausible.Auth.is_super_admin?(id)

        if user do
          Sentry.Context.set_user_context(%{id: user.id, name: user.name, email: user.email})
          merge_assigns(conn, current_user: user, is_super_admin: is_super_admin)
        else
          conn
        end
    end
  end
end
