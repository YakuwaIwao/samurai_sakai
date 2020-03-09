<?php
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

      $sql = 'SELECT user_id as userId, password, sys_date FROM tbl_users order by sys_date desc';
      $stmt = $pdo->query($sql);
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      // 結果を出力
      //var_dump($result);
      http_response_code(200);    //HTTPレスポンスコード(200正常終了)
      header("Access-Control-Allow-Origin: *");
      header('Content-Type: application/json; charset=UTF-8');
      header("X-Content-Type-Options: nosniff");
      
      #JSONデータの雛形（連想配列）
      $json = array(
        'status' => 'success',
        'resultData' => $result
      );
      echo json_encode($json, JSON_UNESCAPED_UNICODE);    //エンコードして送信
      exit();
      
?>