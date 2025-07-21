var at = document.documentElement.getAttribute("data-layout");
if ((at = "vertical")) {
    // ==============================================================
    // Auto select left navbar
    // ==============================================================

    document.addEventListener("DOMContentLoaded", function () {
        "use strict";
        var isSidebar = document.getElementsByClassName("side-mini-panel");
        if (isSidebar.length > 0) {

            let currentLocation = window.location + "";
            let pageUrl = '/' + currentLocation.replace(
                window.location.protocol + "//" + window.location.host + "/",
                "")
                .split('?')[0]
                .replace('#', '')
                .replace('/#', '')
                .replace(/\/$/, '')
                .toLowerCase();

            $(".mini-nav-item").each(function () {
                let $miniNavItem = $(this);
                let area = $miniNavItem.data("area-name");

                $(".sidebar-nav").each(function () {
                    let $sidebarNav = $(this);
                    let targetArea = $sidebarNav.data("target-area");

                    if (targetArea === area) {
                        $sidebarNav.find("a").each(function () {
                            let $link = $(this);
                            let $sidebarItem = $link.closest(".sidebar-item");

                            if (pageUrl === $link.attr("href").toLowerCase()) {
                                if ($sidebarItem.closest("ul").length < 1)
                                    $sidebarItem.addClass("selected");

                                removeAllActiveLinks();
                                
                                $sidebarItem.children("ul").addClass("in");
                                $link.addClass("active");
                                $miniNavItem.addClass("selected");
                                $sidebarNav.addClass("d-block");

                                localStorage.removeItem("last-active-sidebar-area")
                                localStorage.setItem("last-active-sidebar-area", area);
                            } else if ($("a.sidebar-link.active").length < 1) {
                                let lastActiveArea = localStorage.getItem("last-active-sidebar-area") ?? "Admin";
                                $(`.sidebar-nav[data-target-area="${lastActiveArea}"]`).addClass("d-block");
                                $(`.mini-nav-item[data-area-name="${lastActiveArea}"]`).addClass("selected");
                            }
                        });
                    }
                });
            });

            function removeAllActiveLinks(){
                $(`.mini-nav-item`).removeClass("selected");
                $(`.sidebar-nav`).removeClass("d-block");
                $(`a.sidebar-link`).removeClass("active");
                $(`.sidebar-item`).removeClass("selected");
                $(`.sidebar-item ul`).removeClass("in");
            }
            
            function isCurrentArea(areaName) {
                return $(".sidebar-link")
                    .filter(function () {
                        $(this).attr("href") === pageUrl
                    })
                    .closest(".sidebar-nav")
                    .data("target-area") === areaName || false;
            }

            //****************************
            // This is for the multilevel menu
            //****************************
            document.querySelectorAll(".sidebar-menu a").forEach(function (link) {
                link.addEventListener("click", function (e) {
                    const isActive = this.classList.contains("active");
                    const parentUl = this.closest("ul");

                    if (!isActive) {
                        // hide any open menus and remove all other classes
                        parentUl.querySelectorAll("ul").forEach(function (submenu) {
                            submenu.classList.remove("in");
                        });
                        parentUl.querySelectorAll("a").forEach(function (navLink) {
                            navLink.classList.remove("active");
                        });

                        // open our new menu and add the open class
                        const submenu = this.nextElementSibling;
                        if (submenu) {
                            submenu.classList.add("in");
                        }

                        this.classList.add("active");
                    } else {
                        this.classList.remove("active");
                        parentUl.classList.remove("active");
                        const submenu = this.nextElementSibling;
                        if (submenu) {
                            submenu.classList.remove("in");
                        }
                    }
                });
            });

            document
                .querySelectorAll(".sidebar-menu > li > a.has-arrow")
                .forEach(function (link) {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                    });
                });

            //****************************
            // This is for show menu
            //****************************

            var closestNav = elements?.closest("nav[class^=sidebar-nav]");
            var menuid = (closestNav && closestNav.id) || "menu-right-mini-1";
            var menu = menuid[menuid.length - 1];

            // document
            //     .getElementById("menu-right-mini-" + menu)
            //     .classList.add("d-block");
            //   document.getElementById("mini-" + menu).classList.add("selected");

            //****************************
            // This is for mini sidebar
            //****************************
            document
                .querySelectorAll("ul.sidebar-menu ul li a.active")
                .forEach(function (link) {
                    link.closest("ul").classList.add("in");
                    link.closest("ul").parentElement.classList.add("selected");
                });

            document
                .querySelectorAll(".mini-nav .mini-nav-item")
                .forEach(function (item) {
                    if (isCurrentArea($(item).data("area-name"))) {
                        $(item).addClass("selected");
                        $("#menu-right-" + $(item).attr("id")).addClass("d-block");
                    }
                });


            document
                .querySelectorAll(".mini-nav .mini-nav-item")
                .forEach(function (item) {
                    item.addEventListener("click", function () {
                        var id = this.id;
                        document
                            .querySelectorAll(".mini-nav .mini-nav-item")
                            .forEach(function (navItem) {
                                navItem.classList.remove("selected");
                            });
                        this.classList.add("selected");
                        document
                            .querySelectorAll(".sidebarmenu nav")
                            .forEach(function (nav) {
                                nav.classList.remove("d-block");
                            });
                        document
                            .getElementById("menu-right-" + id)
                            .classList.add("d-block");
                        document.body.setAttribute("data-sidebartype", "full");
                    });
                });
        }
    });
}

if ((at = "horizontal")) {
    function findMatchingElement() {
        var currentUrl = window.location.pathname;
        var anchors = document.querySelectorAll("#sidebarnavh ul#sidebarnav a");
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].pathname.toLowerCase() == currentUrl.toLowerCase()) {
                return anchors[i];
            }
        }

        return null; // Return null if no matching element is found
    }

    var elements = findMatchingElement();

    if (elements) {
        elements.classList.add("active");
    }
    document
        .querySelectorAll("#sidebarnavh ul#sidebarnav a.active")
        .forEach(function (link) {
            link.closest("a").parentElement.classList.add("selected");
            link.closest("ul").parentElement.classList.add("selected");
        });
}