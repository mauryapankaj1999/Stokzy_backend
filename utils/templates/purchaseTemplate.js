const purchaseTemplate = ({
  name,
  courseName,
  amount,
  paymentId,
  orderId,
  purchaseDate,
}) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Course Purchase</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#16a34a;padding:30px;text-align:center;">

<h1 style="color:#fff;margin:0;">
STOKZY
</h1>

<p style="color:#e8ffe8;margin-top:8px;font-size:15px;">
Payment Successful
</p>

</td>
</tr>

<!-- Greeting -->

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#222;">
Hi ${name},
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
Thank you for purchasing a course from
<strong>STOKZY.</strong>

Your payment has been received successfully.
</p>

</td>
</tr>

<!-- Course Information -->

<tr>

<td style="padding:0 40px;">

<table width="100%" cellpadding="12" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:8px;">

<tr style="background:#f8f8f8;">
<td colspan="2">
<strong>Purchase Details</strong>
</td>
</tr>

<tr>
<td><strong>Course</strong></td>
<td>${courseName}</td>
</tr>

<tr>
<td><strong>Amount Paid</strong></td>
<td>₹${amount}</td>
</tr>

<tr>
<td><strong>Payment ID</strong></td>
<td>${paymentId}</td>
</tr>

<tr>
<td><strong>Order ID</strong></td>
<td>${orderId}</td>
</tr>

<tr>
<td><strong>Purchase Date</strong></td>
<td>${purchaseDate}</td>
</tr>

</table>

</td>

</tr>

<!-- Buttons -->

<tr>

<td align="center" style="padding:40px;">

<a
href="http://localhost:3000/my-courses"
style="
background:#16a34a;
color:#fff;
padding:14px 28px;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
margin-right:10px;
">
Go To My Courses
</a>

<a
href="http://localhost:3000/my-orders"
style="
background:#222;
color:#fff;
padding:14px 28px;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
">
View Orders
</a>

</td>

</tr>

<!-- Note -->

<tr>

<td style="padding:0 40px;">

<p style="color:#666;font-size:15px;line-height:26px;">

Your invoice is attached with this email.

If you have any questions, simply reply to this email or contact our support team.

</p>

</td>

</tr>

<!-- Footer -->

<tr>

<td style="background:#f8f8f8;padding:30px;text-align:center;">

<h3 style="margin:0;color:#16a34a;">
Thank You ❤️
</h3>

<p style="margin-top:10px;color:#666;">

Team STOKZY

</p>

<p style="margin-top:8px;color:#888;font-size:14px;">

support@stokzy.com

</p>

<p style="color:#999;font-size:13px;">

www.stokzy.com

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

module.exports = purchaseTemplate;
