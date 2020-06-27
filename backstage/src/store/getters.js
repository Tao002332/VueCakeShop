const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.admin.token,
  admin_name: state => state.admin.admin_name
}
export default getters
