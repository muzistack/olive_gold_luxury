THE OLIVE GROVE — PREMIUM OLIVE OIL WEBSITE
======================================

TECHNOLOGY
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery (homepage)

RUN LOCALLY IN WINDOWS / VS CODE
1. Extract the ZIP file into a folder, for example Desktop\Olive-Gold.
2. Open Visual Studio Code.
3. Choose File > Open Folder and select the extracted Olive-Gold folder.
4. Open index.html.
5. If you have the VS Code Live Server extension, right-click index.html and choose "Open with Live Server".
   Otherwise, double-click index.html to open it in Chrome.
6. Use the navigation to open Shop, About, Our Story, Contact and Shopping Bag.

PAGES
- index.html: luxury homepage and featured collection
- about.html: brand introduction
- shop.html: searchable and filterable product catalog
- product-details.html?id=1: dynamic product detail page
- story.html: brand story and olive oil journey
- contact.html: validated contact form (opens the visitor's email application)
- cart.html: shopping bag with quantity and remove controls
- checkout.html: responsive WhatsApp checkout with customer details and live order summary

IMPORTANT BEFORE LAUNCH
- Product photos are remote Unsplash stock images and require an internet connection. They are selected to depict olive oil, olives, olive branches or Mediterranean food. Review each image before commercial use and replace with your own licensed product photography where possible.
- Product names, prices, sizes, descriptions, origin and product claims are demo content. Verify them before publishing.
- Shopping cart uses browser localStorage (key: ogLuxuryCart), shared by the homepage and interior pages.
- WhatsApp orders are generated in the browser. Update the single business number in js/store-config.js (country code + digits only).
- Complete Order opens a wa.me link with the customer, item, quantity, unit price, line total, total amount and delivery details pre-filled. The customer must press Send in WhatsApp.
- Contact form uses mailto and requires an email app configured by the visitor.
- Checkout is a frontend demonstration only. No real payment, order database, inventory, shipping or email marketing service is connected.
- Add your official WhatsApp number, business email, address, social links and shipping policy before launch.
- Do not make health or certification claims unless they are supported by valid documentation.

No Node.js, Python or build process is required to preview the static website.
