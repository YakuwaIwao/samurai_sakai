// ストレージからデータ取得
let getStorageData = function() {
  let tmpUserList = [];
  // webapiでデータ取得
  console.log("1");
  $.ajax({
    url: './UserList.php',
    type: 'get', //get, post etc
    dataType: 'json',
    async: false
  }).done(function (data) {    //成功の場合→引数設定、取得したjsonが入る
    if (data.status == 'success') {
      console.log("2");
      tmpUserList = data.resultData;
      // console.log('' + registUserList)
    }
  }).fail(function(){       //失敗の場合
    alert('error');
  });
  console.log("3");
  return tmpUserList;
};

// 一覧を再表示する処理
let refleshList = function() {
  $('#register').empty();

  $('#register').append(
    $('<ul />').addClass('nav').append(
      $('<li />').text('選択')
    ).append(
      $('<li />').text('アカウントID')
    ).append(
      $('<li />').text('パスワード')
    ).append(
      $('<li />').text('更新日付')
    )
  );

  let userList = getStorageData();

  $.each(userList, function (index) {
    let user = this;

    $('#register').append(
      $('<ul />').addClass('nav').append(
        $('<li />').append(
          $('<input />').attr({
            type: 'checkbox', 
            value: user.userId
            })
        )
      ).append(
        $('<li />').text(user.userId) 
      ).append(
        $('<li />').text(user.password)
      ).append(
        $('<li />').text(user.sys_date)
      )
    );

  });
};

// 確認画面への遷移処理
let inputFunc = function(){

  // エラーチェック
  let inputUserId = $('#userId').val();
  let inputPassword = $('#password').val();

  let errorFlg = false;
  $('.user-message label').text('');

  if(inputUserId == ''){
    // エラー
    $('.user-message.user-userId label').text('アカウントIDは未入力です。');
    errorFlg = true;
  }
  if(inputPassword == ''){
    // エラー
    $('.user-message.user-password label').text('パスワードは未入力です。');
    errorFlg = true;
  }

  if(errorFlg == false){
  $('#input').hide();
  $('#confirm').show();
  $('#finish').hide();

  $('#confirm .user-input-userId').text(inputUserId);
  $('#confirm .user-input-password').text(inputPassword);
  }
};

// 完了画面への遷移処理
let confirmFunc = function () {
  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();

  let user = {
    'userId': $('#userId').val(),
    'password': $('#password').val()
  };

  // let userList = getStorageData();
  // userList.push(user);

  // sessionStorage.setItem('userList', JSON.stringify(userList));

  let strUser = JSON.stringify(user);
  $.ajax({
    url: './UserAdd.php',
    type: 'post',
    dataType: 'json',
    data: strUser,
    async: false
  }).done(function (data) {
    if (data.status == 'success') {
      // tmpUserList = data.resultData;
      // console.log('' + registUserList)
    }
  }).fail(function(){
    alert('error');
  });

};

let updateConfirmFunc = function () {
  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();

  let user = {
    'userId': $('#userId').val(),
    'password': $('#password').val()
  };

  // let userList = getStorageData();
  // userList.push(user);

  // sessionStorage.setItem('userList', JSON.stringify(userList));

  let strUser = JSON.stringify(user);
  $.ajax({
    url: './UserUpdate.php',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: strUser,
    async: false
  }).done(function (data) {
    if (data.status == 'success') {
      // tmpUserList = data.resultData;
      // console.log('' + registUserList)
    }
  }).fail(function(){
    alert('error');
  });

};

// 一覧画面への遷移処理
let finishFunc = function(){
  $('#userId').val('');
  $('#password').val('');

  $('#input').show();
  $('#confirm').hide();
  $('#finish').hide();

  refleshList();
  };


