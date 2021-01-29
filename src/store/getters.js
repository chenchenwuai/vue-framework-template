const getters = {

  // app
  size: state => state.app.size, // button size
  device: state => state.app.device,  // pc or mobile ?
  documentHidden: state => state.app.documentHidden, // current browser tab is visible ?

  // settings
  WEB_TITLE: state => state.settings.title
}
export default getters

