-- inserting the forms:


INSERT INTO "form" ("subject", "greeting", "paragraph", "footer")
VALUES 
(
    'مد كابل ضوئي',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'و ترجو التفضل بالموافقة على مد كابل ضوئي في محافظة {{city}} و تخصيص شعيرات عدد {{fiberOpticNumber}} الى موقع مكتبنا و حسب الاحداثيات المدرجة أدناه :
E {{latitude}}
M {{longitude}}
',
    'شاكرين تعاونكم معنا...'
    ),
(
    'تقليل سعة محلية',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'يرجى التفضل بالموافقة على تقليل السعة المحلية المستخدمة في محافظة الموصل بمقدار {{decrementAmount}} لتصبح السعة {{afterDecrement}} بدلا" عن {{beforeDecrement}} للمسار {{path}} و ذلك لحاجتنا لتقليل هذه السعات.',
    'شاكرين تعاونكم معنا...'
    ),
(
    'تقليل سعة دولية',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'يرجى التفضل بالموافقة على تقليل السعة الدولية المستخدمة في محافظة كركوك بمقدار {{decrementAmount}} لتصبح السعة {{afterDecrement}} بدلا" عن {{beforeDecrement}} و على مسار {{path}} و ذلك لحاجتنا لتقليل هذه السعات.',
    'شاكرين تعاونكم معنا...'
    ),
(
    'زيادة سعة محلية',
    ' تهديكم شركة ارض السواد لتكنولوجيا المعلومات وخدمات الانترنت أطيب تحياتها...',
    'يرجى التفضل  بالموافقة  على زيادة سعة محلية في محافظة ميسان و مقدارها {{incrementAmount}} و على  مسار  {{path}} و المحمولة على {{port}} لتصبح السعة {{afterIncrement}} بدلا" عن {{beforeIncrement} و ذلك لحاجتنا لهذه السعات.',
    'شاكرين تعاونكم معنا...'
    );

-- مد كابل ضوئي
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي')),
('longitude',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي')),
('latitude',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي')),
('FiberOpticsNumber',(select id FROM "form" WHERE "subject" = 'مد كابل ضوئي'));

-- تقليل سعة محلية
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('decrementAmount',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('beforeDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('afterDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة محلية')),
('path', (select id FROM "form" WHERE "subject" = 'تقليل سعة محلية'));

-- تقليل سعة دولية
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('decrementAmount',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('beforeDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('afterDecrement',(select id FROM "form" WHERE "subject" = 'تقليل سعة دولية')),
('path', (select id FROM "form" WHERE "subject" = 'تقليل سعة دولية'));

-- زيادة سعة محلية
INSERT INTO "form_data" ("dataName", "formId")
VALUES
('city',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('incrementAmount',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('beforeIncrement',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('afterIncrement',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('port',(select id FROM "form" WHERE "subject" = 'زيادة سعة محلية')),
('path', (select id FROM "form" WHERE "subject" = 'زيادة سعة محلية'));

