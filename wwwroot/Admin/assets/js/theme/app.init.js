

let userSettings = {
    Layout: "vertical", // vertical | horizontal
    SidebarType: localStorage.getItem('template-sidebar') ?? "full", // full | mini-sidebar
    BoxedLayout: localStorage.getItem('template-boxed') ?? "false", // true | false
    Direction: "rtl", // ltr | rtl
    Theme: localStorage.getItem('template-theme') ?? 'dark', // light | dark
    ColorTheme: localStorage.getItem('template-theme-color') ?? "Blue_Theme", // Blue_Theme | Aqua_Theme | Purple_Theme | Green_Theme | Cyan_Theme | Orange_Theme
    cardBorder: false // true | false
};