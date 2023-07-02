// import {
//   API_ACC_INFO_LINK,
//   API_MMR_INFO_LINK,
//   API_LAST_COMP_MATCH_MMR_INFO_LINK,
// } from "./links.js";

let _Nickname;
let _Tag;
let _PUUID;
let _Region;

function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.classList.add("position-center");
  newDiv.setAttribute("id", "mmm");

  const msg = document.createElement("h1");
  msg.classList.add("firstmsg");
  msg.setAttribute("id", "wassup");
  newDiv.appendChild(msg);

  const newDiv1 = document.createElement("div");
  newDiv1.classList.add("position-center");
  newDiv1.setAttribute("id", "mmm1");

  const input1 = document.createElement("input");
  input1.classList.add("inputval");
  input1.setAttribute("id", "enteredNick");
  input1.setAttribute("placeholder", "Введите свой никнейм");
  newDiv1.appendChild(input1);

  const input2 = document.createElement("input");
  input2.classList.add("inputval");
  input2.setAttribute("id", "enteredTag");
  input2.setAttribute("placeholder", "Введите свой тэг");
  newDiv1.appendChild(input2);

  const inputbtn = document.createElement("input");
  inputbtn.setAttribute("type", "button");
  inputbtn.setAttribute("id", "next");
  inputbtn.setAttribute("value", "Далее");
  newDiv1.appendChild(inputbtn);

  const currentDiv = document.getElementById("start");
  document.body.insertBefore(newDiv, currentDiv);
  document.body.insertBefore(newDiv1, currentDiv);
  document.getElementById("wassup").innerHTML = "M9X VALORANT TRACKER";

  document.getElementById("next").addEventListener("click", function () {
    const Nickname = String(
      document.querySelector("#enteredNick").value
    ).trim();
    const Tag = String(document.querySelector("#enteredTag").value).trim();
    async function openModal() {
      const resp = await fetch(
        "https://api.henrikdev.xyz/valorant/v1/account/" + Nickname + "/" + Tag,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const respData = await resp.json();

      if (respData.status === 200) {
        Array.from(document.querySelectorAll(".content")).forEach((item) => {
          item.removeAttribute("hidden");
          _Nickname = respData.data.name;
          _Tag = respData.data.tag;
          _PUUID = respData.data.puuid;
          _Region = respData.data.region;
        });
        document.querySelector("#mmm").style.display = "none";
        document.querySelector("#mmm1").style.display = "none";
        document.querySelector(".greetmsg").innerHTML =
          "Привет, " + Nickname + "#" + Tag;
        document.querySelector("#lvl").innerHTML =
          "Уровень: " + respData.data.account_level;
        document.querySelector("#region").innerHTML =
          "Регион: " + respData.data.region;
      } else alert("Такого пользователя не существует, проверьте и попробуйте еще раз");
      // );
    }

    openModal();
  });
}

document.body.onload = addElement;

// _________________________________________________________________

// document.getElementById("next").addEventListener("click", function () {
//   const Nickname = String(document.querySelector("#enteredNick").value).trim();
//   const Tag = String(document.querySelector("#enteredTag").value).trim();
//   async function openModal() {
//     const resp = await fetch(
//       "https://api.henrikdev.xyz/valorant/v1/account/" + Nickname + "/" + Tag,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const respData = await resp.json();

//     if (respData.status === 200) {
//       Array.from(document.querySelectorAll(".content")).forEach((item) => {
//         item.removeAttribute("hidden");
//         _Nickname = respData.data.name;
//         _Tag = respData.data.tag;
//         _PUUID = respData.data.puuid;
//         _Region = respData.data.region;
//       });
//       document.querySelector("#mmm").style.display = "none";
//       document.querySelector("#mmm1").style.display = "none";
//       document.querySelector(".greetmsg").innerHTML =
//         "Привет, " + Nickname + "#" + Tag;
//       document.querySelector("#lvl").innerHTML =
//         "Уровень: " + respData.data.account_level;
//       document.querySelector("#region").innerHTML =
//         "Регион: " + respData.data.region;
//     } else alert("Такого пользователя не существует, проверьте и попробуйте еще раз");
//     // );
//   }

//   openModal();
// });
// _________________________________________________________________

document.getElementById("mmrbtn").addEventListener("click", function () {
  async function GetMMRData() {
    const resp = await fetch(
      "https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/" +
        _Region +
        "/" +
        _PUUID,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const respData = await resp.json();

    if (respData.data.currenttier !== null) {
      document.querySelector("#th1_mmr").innerHTML =
        "Текущее ММР: " + respData.data.elo;
      document.querySelector("#th1_rank").innerHTML =
        "Ранг: " + respData.data.currenttierpatched;
      document.querySelector("#curmmr").removeAttribute("hidden");
    } else alert("Видимо вы еще не играли в рейтинг или не прошли калибровку, информации о вас нет(");
    // );
  }

  GetMMRData();
});

document.getElementById("matchbtn").addEventListener("click", function () {
  // document.querySelector("#lastmatch").removeAttribute("hidden");
  async function GetMatchData() {
    const resp = await fetch(
      "https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/" +
        _Region +
        "/" +
        _PUUID +
        "?size=1",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const respData = await resp.json();

    document.querySelector("#lastmatch").removeAttribute("hidden");
    document.querySelector("#th2_map").innerHTML =
      "Карта: " + respData.data[0].meta.map.name;
    document.querySelector("#th2_agent").innerHTML =
      "Агент: " + respData.data[0].stats.character.name;
    document.querySelector("#th2_kda").innerHTML =
      "Убийства/Смерти/Поддержки: " +
      respData.data[0].stats.kills +
      "/" +
      respData.data[0].stats.deaths +
      "/" +
      respData.data[0].stats.assists;
  }

  GetMatchData();
});
