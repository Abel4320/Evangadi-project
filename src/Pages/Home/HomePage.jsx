import React, { useEffect, useState, useContext } from 'react';
import  UserContext from '../../context/UserContext'
import  QuestionContext  from '../../context/QuestionContext'
import axios from 'axios'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
    const imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAbFBMVEUAAAD////u7u7t7e3v7+/9/f38/Pz5+fns7Oz+/v719fXw8PD29vbo6Ojh4eHd3d1wcHDV1dWGhoYmJiZmZma9vb3IyMi2trZ5eXk4ODiioqKsrKyZmZkzMzMdHR1ZWVmRkZETExNKSkpDQ0Mk82GgAAAbuklEQVR4nM1d2WLjKgwtXsAGnMRJ7Kxtkvb///GyS3iLs0x7mYfRZMBINsuRkMQH00UKXWjJWE4NyRTJLMlzyhjhQNrKpSKpq0z0M0wNqYg8t5XNIyxJc9WO2U6ormxISSijue1EPYK6dvppOXDkmNOtStdfDv2ViCP2QXSRiSop1STNNMnNzwmQvFCkyE1lRSaZIVmqyIKZdkLRhamcazIVtl0S2jH9iMRULovQLod2JdePc+00mRiOmKZsO2o4kqaGMMyVnqNUcYSESUCYxNZHcvEUhElHhUmcMAkwFQuTZFaYNBYmvStMNimM48gJkw0KkzwkTPKgMOm/EiZJVXHCaNLW11ThhVHFDzNFJo4/XcN/GVX8MNOVu+1MZT/MQjtT2Q8zUwPaeWFCO2o4csPGtCsDR1oYuwBwXQzJDCkHST5cebhdr7Ls1ui161WeyZyv8aGWgSyRpSo5zxTNqSalJpNc/8yEohMWyMxULhWZqVGlKALtSpYoUpjKNBOqM/MSiVp+KLOk1A8Wul0pM/UMYdtloV2pH2H7y01/PA8cidy20zWI58j3J7KPBIaeHb2aLO0oLMOQLewHz9IwnwTMJ5F2VixTmRRF3ZxOp/N6v1+tVvv99XTatQs1NCiTaD7RMPnsvCBFmE9lBhyZSZuRMEUK218GK12WIGFKmFJWGFGG+l6YJBIm4SCXFybTX4Mvj+vt4XOz+fr6un24clP/2Hx+Hi77cyvsTNWdgDCiJwziCC0OhrmU/nNhCOP1cfv5cbd8bk9LNdjVQJsSJhsXphgSRq8P/j2Y9Si3wuji1r2w0jFdwwsTFq9AUslPl/tyQLkcF8I+wqxYfph1OfKvVy2LiCPiBn5Y6bLUrmZMmhJTAzRQXMY1qKzq4/cjkthyONcVZ9GT0YO7HMkeHZFun0kL2GeK8MqTIuwzQpNon0nRPqPaFfXxoW+Cy/e1WZqvbfaZwu0zhnT7TKHI/j5TRPtMcQ8BzIIzCkbWu/3Xs6Loctsea/pGBPCsMEIWzfWJ4dUtP9eG2ye/R5h0LjYrQHJenfYz1q455XO/q6TesgaF8cMMCZMmPdRMdZEiU4skM7QhZa6oXJNqA9YkN6SpITNXOSfytN3c4fHr5+fnW5Wfw+Fe1c32WChNB/oThiFmOTJ0FjiiljkKHFH6of9OZK4KtQxTTZr/zvSvuSETpknz2MxUVpsSZ81lgr/v1frUtHVVqFJV1WJRVMu6ba6riUH5ddkpeAsc2f5oYE4AR1kZOBLMVR6GM25fmoQzZPl9G+NpfSq4Vf9MXaNCul1EjaRqcVqPjc3b91LPhmjTtCudmRcEmHsnAihWI2Nl31gJzPi2y6jRdbwWmuiXrbqoxwS6VDxL7iKAR+FMNi4M2w18ldvn5Vyr7ZPbxQFU40gYeMNkeb58Dn3dYyXuYrPxL9NfH4zwpDfMbGVaD3yWw+W8tAtmhoSx5Ih9QDBZn7eHgY/TyrvDDJgL9oEPgyC4U3cApvDwq/3ZK0GKpMWpP0Au65YTamqEdoB60JOjThRBeLu+9D7P5liVoxxJeLIlfX8ezoDanACYHIYzA59ldVoazFfcVZuzvtrMFdBe9cTZNkK4eZEOq83AnAFYaoaPIIC+qSlsmqfe0rpqKjeU0rkGDYD5SnKlAlXNvivO4Zzxfwxn5LqLwla7KsyLp01NkiTtvvuS9guYF6+bmnrCkMW20+H3bmFZfezLDNnNRNsF3pc6CDNtBIyF6cwZNxaRqUnPmYS0nSH2dawy4ZZfGMPRnIG5xpDWhecMjP3k1EEUhx1xc8a2owVw1FUBEjVnhDcRsxJMxKWz3moLMPNW35x0+9ouiKqt3pG3QzNmSGNPpsFErI3IXJuWgz1ZaHtNDnbo0nVC+Dru4XZW61Vp1qrM26EdR/rHnAXLuAI8wuwzdn0osXXGzNB402TnuKNN48xHIh5Kzjqj95ksM2YmJqpKqVcsd+PV7RdmCGbBBmBXurqz7awrBuN8YJ9J/UqihtR8OCOu8QhbZSwdsM7Apqk+UrFYNGpXNBYajQ92dVFoKxzMpwHrzD7+/nuzvrzVOkOSeAB8nzRGmRKGVPWuD7+U1lJXQk4Jw5p4Zhpp5gmDJ3nHepv4L6lmcxHJ8rVfsNg6gye5EUa015+uJE6e9W7hRo41EftJ7q0zchlr4avKrSR+mJllwL1pWBzUMLNmWhpMtoNWX1ZFu/7nOSXInsy7xmBGZDMK8g17am+i4/ZrVhyjmbOtSN/4TFF/jvwwmpbVcajSd0qnaZZGATO6Uam2yliWXcozU5kZNYmV/hGZaUfKdn1Hq/xaNYKbdmoRMspjqUmvdRHaxNIsWMxRIHU7o63pBXf4SMNjMzeUWLQ5/7QKNSVhdKDDJjfu+HlkgEVvZL00fehNCZ+cuaHE6mgH3VZmVOUJnLfodmADSGcjgGi+GN1p6uRs0YNZw+W7dsIMHTZJXkVgYyXsvHgRm0kS7S/bko0fA2qm6hmfxZbbblwYnggeje31q8LoHSmhJ/yiV9MHtJK0c0XR5TxxDKgWt2h0H0nH1DQgjD2AslbeLi2ZZHSH5/Jeq0MMKmuSQTvGdo/Iot53LvXjwqka7lpSckVVbyfmOpHQddzuA6k7otDKbZhS1tBeox3stlYbDsw/tM/4TfNBWZQ09kNE+0ziQahCHWhUfDbO2GP3GdsuifYZjADSPgLARpjbuhLJ5PnMQ2PMlvPU+Qwvrmj7vNROsXwSztArfosFTyaFWT5hPt/sJoTJRLVG32ZVzBFm2HqbxMNGoQqnFUJlIJUw1VOnGj81wai5c6YpFngVOCNhPJzBqNl5o1CaBz8X9ceZI5cIk1wWzvtF26G9f4y1C1s9qFz3GJ1V1Pt2rjKWjZiUC/SKbjVRP9vKpmsWVTaGc/wsYJiWJdoyNq00glLaq2zJeNl7oNyORp/zb9NyGTrJyQK90QP3zDkHIsQRzQOcgSMNsCdfUZc7iY800t4+0zcPzC4KHyE4A+cz/gweLyt7kk4caThhhjZNPJ+vdOzkzAtz7jE5u1wrGYQZOGxiR6h6a1jxDALI0SDbks5hU0+Y5dNnmqq0k8IkBO0PB39A/djJ2RE+zIbJ0TNNvZioR55ekEVvnSUIoxnk7vWWpRImS+C93tYCo+BYmC5AMOBESJZjwNjmXpFSIAMqO/1K/USfnzGmLErdtdO6FOk7YZYjVsOLPbSl6RuwV+AohjNa/bWyJgVa369Z0XPfyrBNLREP45i4HEXs1FC4fcbb1HL04feJGIIz+Tic4TtYEC8LccfdRG3UrwnzyYcRQGAug2mzOfHH4AxboMaNyO4JM1+JGSm1mHYEIi283O2SzxAGVm6sxGh46YQRY8I8gTDjcmbTX4bwK1Q+iWzC1NSbM0hn/W6FdSnx9mRU2XvWFi9sMrb8kMK5lCgCVADoBBsFLkvhHYHiOWOsMw48lOYEWqMENJ+PRBtRnLefPbm24MFYZ+wxshg5rX2glKU+Htfefsb2wlEnljlyghVtp6CW/jHmqBzcNAUCd9vKvf2pTTN93UujuuvXTGF9/S56fs2jCEA0odnmRHL/8HE4U70sy0d73xGogVfWlHPhTFagD5MgI/yoMIvXhTnP8GpCn4bP9WtGa9PXTsJh04Bfc2o3uGaIvcfK2vs1u+OOjl+zPe6AT9P2LOPIr9kf3+iAAQrTeRu8iM26YCuHsx5P0peAmS0r4joR3f4MbdhAgPNCuhxpv2bj5sONg432BEk4JQK6aIhzBKLIESiYehNuVx7x8sqsjYuJdegprSOQXVkT8FJSpETb2ZIEI3kWOwLF6g6w9lPO8mvunEM9J0w+aAOIDIQZg8m8JwOb5gCcAfW38fWn4cxbvkye3vVrTlkd6t/YHGEINPggM4U5DnD3YFkNCdP3aopfdFcY7dsWEIoqAi2AV1Pf1PBwpggWTf2rNzW9qAAYYRjAGVW8ChA64ZrMkA64tSud5siZmgoUpWGXLZqB8Kkcionoh1jky9eFuZKxkA4c3SF5aLBZMM9FiNKw+0yq0Z21hQBeXok0fjF+n9HvKIev9j4EYIdG6C/4NQcQmoowbm5nCfuM5ah32ITW8hatWNMI4B9gM8Akke8M2tAvPLsHZ7Jg9d9Us4Xhr6PmfJ6TtlgENfBnye9ZZwDNrSUs813U3DECspeXs2/SNwL2/ZpL9f9X32RzkkXHCGida519M8fnO03uLLW6eDs0rpwH82z5uqZJcm/szkc6MSBFcMCBeypkxNGHM9nqop7Fk6BibmrnAe3wl3aXtoGeFKzlrh1/3QYgfSfuFXqOPCldf2QR5sFWeEGtL7ew8TPerzkVcFC2X/gwrdSrzaPxM69bZ0QyFD8D9ixA1CJ09V1H8TM9RyAJXljntO/XPGbQeNludtaPmxnZFLq6HafhDLuG5zf8gTAtUb9ialYL8wPCtOF9r8dPzko9XMIa+10L7z6fdv2au8KoCq/BsyuH5XcCNduVDnhcpR1hIqzAlmH+7ys5EiCqvYawF48x9bJXPs2tpv5pwX5tnuxM2b4TU6OESXOpc8Q+5x21uQ2rkvYh6Pho4jAtD2eCXZi88GnW/nymiP2h0244sPGd4aGnzY4itbnn17wLtil9CPxI1PkLBzQHfHI2iQCMpzWH88Yjm4IzR+jgQWEo67qjzi23c5I9EnXOYURfkWtgTxhYzC7LR4XhSc/Lel7ZLvj95AZIGAFG/X06JIzG+mqEZoGfvX5mihSwjgpQRCqA7keIxUC8xf1yaHkRNkbNhhWmsByZN4ZUAP0r+AtvrX+kVQGCX7MFD+gDrjWS6MEZVDmGQQ5pPCHLZqdAGe6EdjuJ4YwuCAPICM7ApkkEh8VMrfzeJy9JBq0zfQ+Np3xn1sSP1xHrTPhqwUuQnr3++FNz7X84CGd4ONH5OvKnArUfRjV7BpNvbtQ5Cad6Xw0fhTMiBF997uRkmNZo1PmDu82KPhF1XsIR5U70hXFHOyLYPg6NWiGmowGHhpmCoo8s0F/7Eml584cZ2tqzUDk4AkmrrfAgzE/LYiUGSN5TNbj52QakctnMVm0ORwrtwiNoT3/StLEnc7cAwDp1gnaqstc0tcmWglXqok25pbVD65Mzok29OoWFIqUhjZWZJiYglXg7dCLzktQzvWcval8ORmtNlbYT/TTigmLDk42mSagNgM0CgjwyzFFkAyhBGHNelgxvmuMOp7ZycZwx1Dbr2gzdZ/LOsLBrXrnnqOcIBHaJrXnkkxmBiOiHXHXLtnGxmK8JY108h8K0cnn1lVYyfBkJD7crz/2MQJxX7aT7yWVXceED6JJ7wmQTwmQDwlg4A2ftK9MWwZmuRXMAzoTKuSgyUbXrsamzbUWijaU+TKu4A2fAokkNRzLvgLMAZ7AROQXQY8zMyJLbs/pGSl2svjmjNauG0oMcjgvGsIlYDj2iY0SOzeEMbI6rCpvDP7RPsjsF4AsQphLY1wb2GRxXgByBIBgoHEXSQvsf1rvt59fXTZevzfZY67DzpEDnlgPxM+ppRXefMVZI146By8VKuzcMwhleYWGeS6KjEw+h2GY3ZhZ1XVuAW2rJwd9fo9kw+eYiACzMQozAmTcII+qlEgcFapvKOhqQZyjq3EdiLOrKe5w/gM2QMPtYGKTnc3CB2S60T3zPCIhia7pJdLTki3b9+b1bSOtL1EkX1o/hzJrVbX9a0u4wGzYCanjcG2b7RYaHGRhyFUIJ+8xlyWNTLyLd6S/YhQ1JWX0yfdxWO6G3dtwOKnt3X/VdWhtZfDm3nCB7Mu2SNu2Ec2Y2jwNh1gVHlX1CEPuAgAC+tTc01o3cqfugtqZIwlpI2LLZ7yoFlbrtGJAlLZp10EsPeyV+qDysEnLcXwpwRga/ZtVfbGraIWGIDdMKQ3DKQ4O0+whebi7Xdirz3OIcJ6fabHdkhoeGC6Fn4Kd0ij00rDDu5CwI89OaQT0LzqRksepp/7efy7kurV+Rz2FWJCZf2OK06qcS2WxbDzNCf2NwhoF1/zQRdd4E5ayZLQwTI6F/t81he2oLasOAdW3K29P+ZzBthg4QTE2HM4QBfWZHBoRx7vOgNp/MMBtHzd5wItjdEIDPy/6qynooWUYszlnwsDUNnpzZMC0WTvduDfEcdRyBOCvhzOgacovyQUcghzeQcfod5bsN+TxQf8ERyP1Mj/7bHuoycgTCTg3oYGKdKUxnB8eoU0Mq0uYpU9lEOWXTTg2GDWRq4sGpIU+K2KABtkKDE6YRQMaXL56XDZVVzbsZgXp5Z4K2tF2MW2eyAp0W8DtwRvDmtQOmkbLZJXwazoCr/joZsM5I3zTgmYO2SPWFAeuMggtvygXWK9cFL6a+DKzMZxkLo00EYRpw8DU5yRBCn2QhFiCByqO61+tlX0svjOrPL6eKtHOmCecup9zUcMt2FuAM54Ix0oYJfczNmTgPcEaR3Bl9uKDVkyb/eWVblyZYxNmQ7PmZgTM6iiOArs2Oeo7MiV7HQwMNR2HDgb33Ot5nUlm/dUXuF7VGJwnAmSQcj6thAorKd8vAQ0P0DpvAaUgf0IwggEK+FMY0q3y2OrZ9CAEI2Nq2SzmZRAccFNsxYRiv35DR8G5p+bAwvA1TZp1NOwIBODnRkbTg9FdkMdIEYdAwA4P47ciGExx6vQS5mxTloD7zWqjcI6VmSH9yC4BAuv2PAj+IfZfgMDMqDhFZJoowID9rtQQoPYpZv2ZN6vwa/MXosgfKZiFTsxVo7vTSnCkdLnIEIs6vWTGnFPIs9tBQQw0Qys5p3NGmKd4QXTK7KOU9xZum2WfgdG5/zxVYwqSxqXhiYTL2D+DYeFkp7NVBAJBkaXO6J4yoQJVf9oQRr7v8PVRuCnx1hEkCfz/VXb9mFHJj1TikAjDW/Cs8NibNUXRUAHAh35Jhv2aUjRm7AndTItPFby1koXy2JErSDMP8diZRMmnwa06CLSRfgBpcZSm+FyCR/xSQDZdtRcERiGQQQbJZil78TAxn9GIMy9WaRQhAviF+4fFyFQIQAJqzFxaA43iYFkeeCWp+gTDI5eFXS4OFgYjA06QwLkxLCBRCKNMAZ+JsFr9YfpbCwxm0ydwKAcL4aMC+MbS8hhbfErn7nv6dNjZdjB+PhjM5wcFA4EwT4Az2A7D4qyzgOS3xgiIY8eulJdYPgKEZYIzhHdz2gZBxiG0G9LUNHhrd9Ia/WX6sh0aGQg5+wn0CyUiCQy8MbEyb1iGAfPFSfvkXy84gAA5OwB87MfcuDQlDc+X8f8tfxJf98lnq5RTlvztU2XDUeRLOXEPiKRibm522BBSiHurj98pZLacS5Vs4iRB1nnQTHHbuwMlRPPAq07+Tv5v9phwSJvGMWcgoTiz2a06DC4HCa0WaRCH0BM+iPyprgkPolUpPkB3aODUk5UhOQKxOGj/aX9Mux8p3hfItXPQx/OwkOhlrYIe8yndElb9Yvo5IkzrljwiTsBSwi0LhfwRkcDkAMLQOwEPC5MFVLaXBP00tb0gNWy3ffQrzUvnaGfc6w6cJHCPa7pFkpQ3T6oaq69MqnETn8pcbZq+szNk/p+jIz5ERnMEJDv8K8N8th9beBZHfgTNAqg/Hr3+FkqfL+pkEh6L6X80UXw7JrItBOtdPpLL9H34afViOv4xJwhqEiRyBhAsstXoCuf416/2yIj7GtOwEpGp9xsGZOMWxQ570fzfQNkLEtzY6ODMYphUn0pXt/2pN1oNMJk+nOOa/a429W848eV6YrPhVO/m9sudijjBpkXoVINOkz9cs3usb81pRYDmFnGSdK1uQXzPK0RzT9P8DBDaNxIyyDs9aOesZNNytjUbx12Lv/i+LwFFks25sCO4mAzc2lH9oY8LlGq6twHdpPHr9hPhfLAJ7bY6df5dGPzWtFV6MXWn2m0Xh/jTccgL3dGnXJJTcoOeqjLyIXYIK+ffSbAuKORqDM5HlmcZ5Mrwhd/S6ud8qlyWNOaKD+TXg5CzB2MxdOxTgT/Kn281lKV2qFpQoM4PkH+MnZ8MXUC3+8Ntsa5lGkU13EMDd27Tk30mz0tlZHxEmTROUFhyGGZxp/tnB2V5Hv/iTM8ORH2b4SgbkCOSTY8R+dzQiZfYn+81eUGAOcYT5ZN4T0LgsuH0GSBskZ/cZcGo4/T6yuQqfkgL8miVys4idGjoIIJm6HJTsfln1/DxKUQzfp9kPe3z0plPau/Hun5ZLw8SQk/Yd64xdH9JYGJ+rCTWVv7kM7CsKHPUubRs6BsxCCs6c26SgBjGYCGxjh2badTixdmiRcDHnQqZ3lM+z8dFXzOkgbhOMnQjLkWGutElBE3cDlkkKOhg22s8FZFyHzQ3t5XSk77vKtglXmJq40l6o60DU68C9AOAij/cZ5HC6PD+ZYWZ++bouedb3azYcFeP7DAgz965z9Wn/9TpwaY33T88VOJ+FAB4RRhZCVP/UBnXkmKN/ewu9vltSviFB40i5FOTZW+hLXQzQzKgmqcsup0gvjCbtTaymht2zcrL8+QeG9dtGZwctbR5Ny5HbGDXpMxRo2m7xeeBIJ2zv5Z6dgDMmTCuYrTjbfb8Z33x973DuWTIcpoWZAzjTDdO6iwDiQO2MFaftGxe2r8tRM3436vzly0EHo87VEMx2+zc51H6tjtaR+lVh+nfQmnkxK4ReNNc3wE99Y6jMu8JMXdxeDgjjo5OJv7EUtGp0K8rwlS0e07XHF0HB9thWMhu4sqUTXI1vOgXm4IAW2Zbt1TUuWQW6pS9c3ifhPj5bwV9sSqv2/LSr0M+6WUg61InrRQZzsgdYgeWYI7M0BxuAIv0+ExZCbpdKt8/oyuaDG9Jfc6Rf16JdPwFBD+tmWZhb0kq45sgvze6aI6ezaOZgaQ77jONo4uL2e5vmUBo9IYrl9SGc832tpLbTPZpEB61AT1ln5mQEUmBcXxB4vszZTH+uLUPLzjuFScJiF6FmaPpIriYi6+a6vRw+PzdfNxDMpmv5PFxW17YWxGU266Y3GsjX3MsIZIXpWsYhX3MmMm+y1aQxPpdC3wfjFLf4/pkss8kx9K28WWinKlujNZe0ZDJZNqfzdb1f6bJfX6/n466u7J27+hH+ogX9ZNvOPLkMnfjMHcBcFjrJRYejkK8Zx5X1jM/ONh3fG+gTgtCQurmb74LqddDaQQjTypUnedyJeTKQlCKyy5Ehc2Auj1Muoovb+1dQ9hPppsnEFZSE2Ivbfd4ZlKol8Zl9clGk0f1/g5nn+hmBcOY5s3iFG7XnOALNgTOTd52jJDoUMmXhJDojd53PQwBvx2b3hUlBmOIJYR7FZt3btNAhgXMdTlFGoAISTxVDGYOjxFMAg6Bybiu7YaZPvPuJpxCcKVKcFryYhjOFv7g9WG8xPUz2TL0PtXP3/5k5DTXkVDsTWc6gXY/0HPXCtIbuOic+GY7LPAeplFM0yUNlnI8JtTNfzRkm4O3n0K60SZqh3XASneiuZTcp7GHTf/nKNOQq+ccWAAAAAElFTkSuQmCC'
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [questionsData, setQuestionData] = useContext(QuestionContext);
    const location = useLocation();
     useEffect(() => {
    // Make a GET request to fetch questions from the API
    axios.get('http://localhost:5000/api/question/allquestions')
      .then((response) => {
        // Set the fetched questions in the state
        setQuestionData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [])
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
    };
  const sortedQuestions = [...questionsData].sort((a, b) => b.question_id - a.question_id);
  useEffect(() => {
    if (!userData.user) navigate("/");
  }, [userData.user, navigate]);
  return (
    <div className=''>
      <div className='pt-[150px]'>
        <div className='flex m-7'>
          <div className='mx-auto'>
            <Link to="/ask">
              <button className='flex items-center justify-center text-white bg-blue-500 hover:bg-orange-500 rounded-md w-[170px] h-[40px] '>Ask a Question</button>
            </Link>
          </div>
          <div className='text-[15px] pt-2 font-semibold mx-auto'>
            <h1 className=''>Welcome: <span>{userData.user?.display_name}</span></h1>
          </div>
        </div>
      </div>
      <h1 className="ml-[50px] sm:ml-[100px] pt-[70px] text-[25px] font-semibold">Questions</h1>
      <div className='sm:ml-[100px] sm:mr-[100px] ml-[50px] mr-[50px] justify-center '>
        <div>
          <div className="mx-auto">
            <hr className="mx-auto border-t border-gray-300 w-[100%]" />
          </div>
              </div> 
        
              <div className='mx-auto mb-[100px] '>
   {sortedQuestions.map((question) => (
  <Link to={`question/${question.question_id}`} key={question.question_id}>
           <div className='mb-5'>
               <div className='flex mt-9 mb-9 items-center'>
                   
                    <div>          
                        <img className='w-[50px]' src={imageUrl} alt="Common Image" />
                        <h1 className='flex justify-center'>{question.tags}</h1>      
                    </div>
        <h2 className='flex-1 pl-5 text-[12px] sm:text-[14px] md:text-[20px] lg:text-[25px] font-semibold'>{question.question}</h2>
                   <button className='text-[30px]'>
                       &gt;
                   </button>
                   
      </div>
      <hr className="mx-auto border-t border-gray-300" />
    </div>
  </Link>
))}
    </div>
      </div>
    </div>
  );
}
export default HomePage;
