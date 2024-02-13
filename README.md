# プロジェクト名
ReviewSpotter

# アプリ概要
Google Places API を使用し、
指定したエリア内の店舗にて（Googleビジネス使用店舗）で、
何件のクチコミがあり、またそのクチコミの評価が何点以下なのかをリストアップするアプリケーション

# API連携想定
## 導入手順はこちら
```
https://developers.google.com/maps/documentation/javascript/places?hl=jahttps://developers.google.com/maps/documentation/javascript/places?hl=ja
```

- Google Cloud Consoleでのセットアップ:
Google Cloud Consoleにアクセスして新しいプロジェクトを作成します。
左側のナビゲーションメニューから、API & Services > Libraryに移動します。
「Places API」を検索し、有効にします。
APIキーを取得します。

- エリア内の場所を検索:
nearbysearchリクエストを使用して、指定したエリア内の場所を検索します。
```
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LATITUDE,LONGITUDE&radius=RADIUS_IN_METERS&key=YOUR_API_KEY
```

- 評価と口コミ数を基にフィルタリング:
返ってきた結果を解析して、指定した評価と口コミ数の閾値を基に結果をフィルタリングします。
以下、Pythonの例
```
import requests

API_KEY = 'YOUR_API_KEY'
LATITUDE = 'YOUR_LATITUDE'
LONGITUDE = 'YOUR_LONGITUDE'
RADIUS = 'YOUR_RADIUS_IN_METERS'

# 1. Places APIを使用してエリア内の店舗を検索
url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={LATITUDE},{LONGITUDE}&radius={RADIUS}&key={API_KEY}"
response = requests.get(url)
results = response.json()['results']

# 2. 評価と口コミ数でフィルタリング
filtered_results = [place for place in results if 'user_ratings_total' in place and 'rating' in place and place['user_ratings_total'] <= YOUR_DESIRED_NUMBER_OF_REVIEWS and place['rating'] <= YOUR_DESIRED_RATING]

# 3. フィルタリングされた結果を出力
for place in filtered_results:
    print(place['name'], place['rating'], place['user_ratings_total'])
```

# 環境
## ディレクトリ構成
- public
    - どうでもいい資材
- Routes
    - ルーティング定義
- src
    - バックエンド操作する資材
- views
    - クライアントに表示させる資材

## 技術
### バックエンド
Node.js(Express 4系)

### フロントエンド
ejs（Node.js テンプレートエンジン）

## メモ
- 現状、デプロイはしない方向
- セキュリティ的に、クライアント側でAPIを直接投げるのは、CORSの問題にかかるため、バックエンドでAPIを叩き、生成してクライアントに返すようにする。

# ローカルの立ち上げコマンド
```
node app.js
```


# トラブルシューティング
```
DevTools failed to load source map: Could not load content for chrome-extension://cofdbpoegempjloogbagkncekinflcnj/build/content.js.map: システムエラー: net::ERR_BLOCKED_BY_CLIENT
```
上記エラーが出た場合、
Googleコンソール側でProxyの拡張機能がオフになっている可能性があるので、これを有効化する必要がある。

