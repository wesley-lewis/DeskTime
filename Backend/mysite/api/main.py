import numpy as np
import cv2
path = "api\\output\\"
net = cv2.dnn.readNetFromCaffe("C:\\Users\\vailantan fernandes\\PycharmProjects\\Face_detection\\DeskTime\\Backend\\mysite\\api\\prototext" , "C:\\Users\\vailantan fernandes\\PycharmProjects\\Face_detection\\DeskTime\\Backend\\mysite\\api\\res10_300x300_ssd_iter_140000.caffemodel")
# cv2.namedWindow("Output", cv2.WINDOW_NORMAL)


def save(img,path,bbox,imgno):
    x,y,w,h=bbox
    imgCrop =img[y-50:h+60,x-40:w+40]
    try:
        # imgCrop = cv2.resize(imgCrop, (w - x, h - y))
        cv2.imwrite(path + ".png", imgCrop, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
    except:
        pass
        # print(f"image {imgno} could'nt detected")





def faceDetection(imgPath):
    image = cv2.imread(imgPath)
    (h, w) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(image, 2.5,
                                 (4000, 2250), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()
    c = 0
    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.3:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")
            # print(f" StartX:{startX},StartY:{startY},endX:{endX},endY:{endY}")
            text = f"{i}"
            y = startY - 10 if startY - 10 > 10 else startY + 10
            # cv2.rectangle(image, (startX, startY), (endX, endY),
            #              (0, 0, 255), 2)
            save(image,path+str(i),(startX+2, startY+2, endX+2, endY+2),i)
            # cv2.putText(image, text, (startX, y),
    #         #             cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)
    # cv2.imshow("Output", image)
    # cv2.waitKey(0)
    

