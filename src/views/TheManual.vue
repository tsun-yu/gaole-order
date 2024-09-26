<template>
  <div class="container">
    <h1>Pokemon GaOle 機台機制</h1>
    <p>1. 每一條共50張卡匣，順序為<b>下到上</b></p>
    <p>2. 機台內共有兩道，一道可裝兩條，兩道輪流下卡至盤上</p>
    <p>3. 因此，通常同時會有兩條，但有機會是某一條的末端接著新的一條，需要自行判斷</p>
    <h1>GaOle 卡序表操作說明</h1>
    <p>1. 利用篩選功能，GaOle機台上出現的大圖及小圖寶可夢選起來:</p>
    <p>
      點擊篩選紐<img
        src="@/assets/images/manual/gaole卡序-1.jpg"
        alt="gaole卡序"
        class="img-sm"
      />，叫出篩選器
    </p>
    <p><img src="@/assets/images/manual/gaole卡序-2.jpg" alt="gaole卡序" /></p>
    <p>利用篩選器將看到的寶可夢選起來</p>
    <p><img src="@/assets/images/manual/gaole卡序-3.jpg" alt="gaole卡序" /></p>
    <p>2. 已選擇的寶可夢出現在卡序表正上方，若要取消直接點擊即可</p>
    <p><img src="@/assets/images/manual/gaole卡序-4.jpg" alt="gaole卡序" /></p>
    <p>
      已選擇的寶可夢在卡序表中，則會以不同顏色顯示，三星以上底色會顯示藍色，二星以下底色會顯示灰色，一二星數量較多，因此看三星以上比較快
    </p>
    <p>
      4.
      找出寶可夢較集中的卡序條，並且勾選，若已選擇的寶可夢有在勾選的卡序條中，已選擇的寶可夢底色則會變藍色
    </p>
    <p><img src="@/assets/images/manual/gaole卡序-5.jpg" alt="gaole卡序" /></p>
    <p>5. 可點擊卡序表中的寶可夢，該寶可夢在已選擇的群組中會被框起來，以利做二次檢查，</p>
    <p>右下有Reset按鈕，可將卡序表中做二次檢查的被點擊的寶可夢重置</p>
    <p><img src="@/assets/images/manual/gaole卡序-6.jpg" alt="gaole卡序" /></p>
    <p>6. 右下有Select按鈕，可將已勾選的卡序條放大獨立出來，方便查閱</p>
    <p><img src="@/assets/images/manual/gaole卡序-7.jpg" alt="gaole卡序" /></p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  p {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    img {
      width: 20rem;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

      &.img-sm {
        width: 5em;
        margin-inline: 1rem;
      }
    }
  }
}
</style>
