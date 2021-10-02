defmodule PlausibleWeb.RequireAdminPlug do
  import Plug.Conn

  def init(options) do
    options
  end

  def call(conn, _opts) do
    user_id = get_session(conn, :current_user_id)

    if user_id in admin_user_ids() do
      conn
    else
      PlausibleWeb.ControllerHelpers.render_error(conn, 403) |> halt
    end
  end

  defp admin_user_ids() do
    Application.get_env(:plausible, :admin_user_ids)
  end
end
