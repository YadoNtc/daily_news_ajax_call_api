$(document).ready(function() {

/**
 * Gọi các hàm chạy chương trình
 */
index();
$('#searchIcon').on('click', function() {
    $('#search').show();
    $('#btnSearch').on('click', function(e) { 
        if ($('#input').val() === '') {
            alert('The field required');
            return
        }
        e.preventDefault();
        searchNews();
    });
});

// Click nút Home
$('.header a').on('click', function() {
    index();
});

// Đóng pop-up tìm kiếm
$('#search p').click(function() {
    $('#search').hide();
});

/**
 * Hiển thị top 10 tin Get từ restAPI lên trang chủ
 */
    function index() {
        // var apiToken = '07b3972184291fec39d7394243b11745';
        var apiToken = '69418e96e964c8d47cc7bd703303b696';
        // var apiToken = '963824c3f3b514d33f15b70d2ed3e7f3';

        // Phương thức get API
        $.ajax({
            type: "GET",
            url: `https://gnews.io/api/v4/top-headlines?token=${apiToken}`,
            dataType: "json",

            // TRước khi gửi yêu cầu đến máy chủ thì hiển thị icon loading
            beforeSend: function() {
                $('#loader').show();
                $('.footer').hide();
            },

            // Ẩn loading sau khi gửi yêu cầu và nhận dc phản hồi(response) từ máy chủ
            complete: function() {
                $('#loader').hide();
                $('.footer').show();
            },

            // Khi nhận thành công bắt đầu xử lý Object đã dc chuyển từ dữ liệu JSON
            success: function(data) {
                var html = '';
                // Lặp qua mảng đc chuyển từ JSON, tạo ra các phần tử HTML và gán các giá trị
                $.each(data.articles, function(i, articles) {
                    html += `
                        <div class="row">
                            <div class="col-md-6">
                                <img class="img-responsive" src="${articles.image}">
                            </div>
                            <div class="col-md-6 column2">
                                <a href="${articles.url}" target="_blank">${articles.title}</a>
                                <p class="time">${articles.publishedAt}</p>
                                <p>${articles.description}</p>
                                <div class="sourcce">
                                    <a href="${articles.source.url}" target="_blank">${articles.source.name}</a>
                                </div>
                            </div>                  
                        </div>
                    `;
                });
                // Các phần tử và thuộc tính HTML dc tạo ra lưu vảo biến html sé được nối vào phần tử
                // div thông qua id
                $(html).appendTo('#showNews');
            },

            // Khi có lỗi không nhận dc phản hồi từ máy chủ sẽ hiển thị thông báo lỗi       
            error: function() {
                $('#showNews').html('<i>Failed Connect to Server</i>')
            }
        });
    }

    /**
     * Search tin tức theo key
     */
   function searchNews() { 
 
           $('#showNews').text('');
           var apiToken = '07b3972184291fec39d7394243b11745'
        //    var apiToken = '69418e96e964c8d47cc7bd703303b696'
           var inputValue = $('#input').val();
           
           $.ajax({
               type: "GET",
               url: `https://gnews.io/api/v4/search?q=${inputValue}&token=${apiToken}`,
               dataType: "json",
               
               beforeSend: function() {
                   $('#loader').show();
                   $('.footer').hide();
                },
                
                complete: function() {
                    $('#loader').hide();
                    $('.footer').show();
                },
                
                success: function(data) {
                    var html = '';
                    $.each(data.articles, function(i, articles) {
                        html += `
                            <div class="row">
                            <div class="col-md-6">
                                <img class="img-responsive" src="${articles.image}">
                            </div>
                            <div class="col-md-6  column2">
                                <a href="${articles.url}" target="_blank">${articles.title}</a>
                                <p class="time">${articles.publishedAt}</p>
                                <p>${articles.description}</p>
                                <div class="sourcce">
                                    <a href="${articles.source.url}" target="_blank">${articles.source.name}</a>
                                </div>
                            </div>                  
                        </div>
                        `;
                    });
                    $(html).appendTo('#showNews');
                },
                 
                error: function() {
                    $('#showNews').html('<i>Failed Connect to Server</i>');
                }                             
            });

            // Sau khi nhấn nút search sẽ ẩn Pop-up search
           $('#search').hide()     
    }
});
