// Express.js アプリケーションのエントリーポイント
const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./Routes/route');

// ejsの設定
app.set('view engine', 'ejs');

// CSSの適用（CSSや静的ファイル提供のミドルウェアは、ルーティングよりも前に設定）
app.use(express.static('public'));

// ルーティングファイルの定義
app.use('', routes);

// ローカルポートの待機
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
