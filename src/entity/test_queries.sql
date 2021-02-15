
-- inserting the forms:


INSERT INTO "form" ("subject", "greeting", "paragraph", "footer", "type")
VALUES 
(
    'مد كابل ضوئي',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'و ترجو التفضل بالموافقة على مد كابل ضوئي في محافظة {{city}} و تخصيص شعيرات عدد {{fiberOpticNumber}} الى موقع مكتبنا و حسب الاحداثيات المدرجة أدناه :
<br>
{{latitude}} E
<br>
{{longitude}} M
',
    'شاكرين تعاونكم معنا...',
    'none'
    ),
(
    'تقليل سعة محلية',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'يرجى التفضل بالموافقة على تقليل السعة المحلية المستخدمة في محافظة {{city}} بمقدار {{decrementAmount}} لتصبح السعة {{afterDecrement}} بدلا" عن {{beforeDecrement}} للمسار {{path}} و ذلك لحاجتنا لتقليل هذه السعات.',
    'شاكرين تعاونكم معنا...',
    'local'
    ),
(
    'تقليل سعة دولية',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'يرجى التفضل بالموافقة على تقليل السعة المستخدمة في محافظة {{city}} بمقدار {{decrementAmount}} لتصبح السعة {{afterDecrement}} بدلا" عن {{beforeDecrement}} و على مسار {{path}} و ذلك لحاجتنا لتقليل هذه السعات.',
    'شاكرين تعاونكم معنا...',
    'International'
    ),
(
    'زيادة سعة محلية',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'يرجى التفضل بالموافقة على زيادة سعة محلية في محافظة {{city}} و مقدارها {{incrementAmount}} و على مسار {{path}} و المحمولة على {{port}} لتصبح السعة {{afterIncrement}} بدلا" عن {{beforeIncrement}} و ذلك لحاجتنا لهذه السعات.',
    'شاكرين تعاونكم معنا...',
    'local'
    );

-- مد كابل ضوئي
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي')),
('longitude',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي')),
('latitude',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي')),
('fiberOpticNumber',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي'));

-- تقليل سعة محلية
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('path', (select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('decrementAmount',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('beforeDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('afterDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية'));

-- تقليل سعة دولية
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('path', (select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('decrementAmount',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('beforeDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('afterDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية'));

-- زيادة سعة محلية
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('path', (select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('incrementAmount',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('beforeIncrement',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('afterIncrement',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('port',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية'));



insert into "admin"("username", "password", "level", "verifyed")
values('ali', '202cb962ac59075b964b07152d234b70', 0, 'true');




insert into "path" ("from", "from_ps", "to", "to_ps", "type", "portSpeed", "lastBandwidth", "unit")
values
('مأمون','S 29 - P 1','كوت','S 6 - P 1','local','10G',3300,'Mbps'),
('مأمون','S 22 - P 1','حلة','S 7 - P 2','local','10G',5000,'Mbps'),
('مأمون','S 26 - P 1','ميسان','S 15 - P 1','local','10G',3300,'Mbps'),
('مأمون','S 1 -P 3','كركوك','S 1 - P 2','International','10G',16,'STM'),
('مأمون','S 1 - P 8','كركوك','S 1 - P 1','International','10 G',64,'STM'),
('شلامجة','S 30 - P 1','empty','empty','International','10G',16,'STM'),
('مأمون','S 21 - P 3','رمادي','S 19 - P 9','local','1G',500,'Mbps'),
('مأمون','S 33 - P 16','رمادي','S 33 - P 8','local','1G',500,'Mbps'),
('مأمون','S 21 - P 8','رمادي','S 23 - P 6','local','1G',500,'Mbps'),
('مأمون','S 21 - P 4','رمادي','S 23 - P 3','local','1G',500,'Mbps'),
('مأمون','S 32 - P 16','فلوجة','S 36 - P 1','local','1G',950,'Mbps'),
('مأمون','S 21 - P 6','بعقوبة','S 35 - P 3','local','1G',1,'STM'),
('مأمون','S 24 - P 2','بعقوبة','S 19 - P 1','local','10G',5000,'Mbps');
