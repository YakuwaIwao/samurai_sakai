<?php
    // データベースの処理を共通化する。
    try {
        // データベースに接続
        $pdo = new PDO(
            'mysql:dbname=myapp;host=localhost;charset=utf8;port=3306;',
            'root',
            'root'
        );
        // echo "success connecting DB";
      } catch (PDOException $e) {
        /* エラー時は、とりあえず、エラーメッセージを表示 */
        header('Content-Type: text/plain; charset=UTF-8', true, 500);
        exit($e->getMessage());
      }

      $json_string = file_get_contents('php://input'); //文字列を取得
      $contents = json_decode($json_string);  //Jsonに変換

      $sql = 'insert into tbl_users(user_id, password) values(:userId,:password)'; //insert分
      $prepare = $pdo->prepare($sql); //sqlをセット

      $prepare->bindValue(':userId', $contents->userId, PDO::PARAM_STR); //文字列に入れ込む 第１、２、３引数（型）
      $prepare->bindValue(':password', $contents->password, PDO::PARAM_STR);
      $prepare->execute(); //sqlを実行
      
      // 結果を出力
      //var_dump($result);
      http_response_code(200);    //HTTPレスポンスコード(200正常終了)
      header('Content-Type: application/json; charset=UTF-8');
      header("X-Content-Type-Options: nosniff");
      #JSONデータの雛形（連想配列）
      $json = array(
        'status' => 'success',
        'resultData' => array()
      );
      echo json_encode($json, JSON_UNESCAPED_UNICODE);    //エンコードして送信
      exit();
      
?>