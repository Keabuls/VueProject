import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
    state: () => ({
        theme:"dark"
    }),
    actions: {
        setTheme(newTheme){
            this.theme = newTheme;
            const bodyElement = document.body;
            bodyElement.setAttribute("data-bs-theme", newTheme);
        },
    },
});
