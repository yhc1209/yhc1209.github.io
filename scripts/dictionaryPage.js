function SearchFromDict(event) {
    event.preventDefault();
    let toSearch = document.getElementById("word").value;
    if (toSearch.length == 0)
    {
        alert("沒輸入阿！");
        return;
    }
    console.log("要查詢的字詞：" + toSearch);

    fetch(`https://www.moedict.tw/uni/${toSearch}`)
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data["title"]);
            console.log(data["heteronyms"]);
            // // let dd = data["heteronyms"];
            // // console.log(`注音：${dd[0]}`);
            console.log(`詞：${data.title}`);
            console.log(`意：${data.heteronyms[0]}`);
            document.getElementById("result_text").innerText = data.title;
            document.getElementById("pronounce1").innerText = data.heteronyms[0].bopomofo;
            document.getElementById("pronounce2").innerText = data.heteronyms[0].bopomofo2;
        })
        .catch((err) => {
            // alert(`出錯啦！${err}`);
            document.getElementById("result_text").innerText = `出錯啦！${err}`;
            document.getElementById("word").innerText = "";
        })
}