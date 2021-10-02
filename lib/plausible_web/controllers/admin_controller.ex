defmodule PlausibleWeb.AdminController do
  use PlausibleWeb, :controller
  use Plausible.Repo
  alias Plausible.{Sites, Goals}

  plug PlausibleWeb.RequireAccountPlug
  plug PlausibleWeb.RequireAdminPlug

  def index(conn, _params) do
    redirect(conn, to: "/admin/users")
  end


  def users(conn, _params) do
    users = Repo.all(from u in Plausible.Auth.User, preload: [:site_memberships, :subscription], order_by: u.id)
    conn
    |> assign(:skip_plausible_tracking, true)
    |> render("users.html",
      users: users,
      layout: {PlausibleWeb.LayoutView, "admin.html"}
    )
  end

  def end_trial(conn, %{"userid" => userid}) do
    Repo.get(Plausible.Auth.User, userid)
    |> Plausible.Auth.User.end_trial()
    |> Repo.update!()
    conn
    |> put_flash(:success, "Trial for user #{userid} was ended.")
    |> redirect(to: "/admin/users")
  end

  def free_subscription(conn, %{"userid" => userid}) do
    Plausible.Billing.Subscription.free(%{user_id: userid})
    |> Repo.insert!()
    conn
    |> put_flash(:success, "Trial for user #{userid} was removed.")
    |> redirect(to: "/admin/users")
  end

  def start_trial(conn, %{"userid" => userid}) do
    Repo.get(Plausible.Auth.User, userid)
    |> Plausible.Auth.User.start_trial()
    |> Repo.update!()
    conn
    |> put_flash(:success, "Trial for user #{userid} was restarted.")
    |> redirect(to: "/admin/users")
  end

  def cancel_subscription(conn, %{"userid" => userid}) do
    Repo.one(from s in Plausible.Billing.Subscription, where: s.user_id == ^userid)
    |> Repo.delete()
    conn
    |> put_flash(:success, "Subscription #{userid} was cancelled.")
    |> redirect(to: "/admin/users")
  end

  def sites(conn, _params) do
    sites = Repo.all(from s in Plausible.Site, order_by: s.id)
    conn
    |> assign(:skip_plausible_tracking, true)
    |> render("sites.html",
      sites: sites,
      layout: {PlausibleWeb.LayoutView, "admin.html"}
    )
  end

  def lock_site(conn, %{"website" => site_domain}) do
    site_q =
      from(
        s in Plausible.Site,
        where: s.domain == ^site_domain
      )

    Repo.update_all(site_q, set: [locked: true])
    conn
    |> put_flash(:success, "#{site_domain} is now locked.")
    |> redirect(to: "/admin/sites")
  end

  def unlock_site(conn, %{"website" => site_domain}) do
    site_q =
      from(
        s in Plausible.Site,
        where: s.domain == ^site_domain
      )

    Repo.update_all(site_q, set: [locked: false])
    conn
    |> put_flash(:success, "#{site_domain} is now unlocked.")
    |> redirect(to: "/admin/sites")
  end
end
